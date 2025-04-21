import os
import time
import datetime
import pandas as pd
import joblib
import ncps.wirings
import keras
from keras import layers, losses, optimizers
from ncps.keras import CfC
from updating_data import update_data

import warnings

warnings.filterwarnings("ignore")
pd.set_option('display.max_rows', 50)
pd.set_option('display.max_columns', 200)

# ========== Параметры ==========
stocks = ['AFLT', 'ALRS', 'CHMF', 'GAZP', 'GMKN', 'LKOH', 'MGNT', 'MOEX', 'MTSS', 'NVTK', 'SBER', 'TATN', 'VTBR']
WINDOW = 3  # длина скользящего окна
DAYS_BACK = 7  # смотреть назад N дней
DATA_DIR = "datasets_hourly"
WEIGHT_DIR = "weights"
CSV_PATH = "rsi_predictions.csv"


# ================================

def load_scalers(stock):
    """Загружает все скейлеры из scalers/{stock}."""
    folder = f"scalers/{stock}"
    S = {}
    for fn in os.listdir(folder):
        name = fn.rsplit('.', 1)[0]
        S[name] = joblib.load(os.path.join(folder, fn))
    return S


def restore_model(stock, input_shape, conv_n=49, pool_n=96):
    inp = layers.Input(shape=input_shape)
    conv = layers.Conv1D(conv_n, 1, activation=layers.LeakyReLU(0.4))(inp)
    wiring = ncps.wirings.AutoNCP(pool_n, 2, 0.5, seed=42)
    pool = CfC(units=wiring, mixed_memory=True, return_sequences=False)(conv)
    out = layers.Dense(1)(pool)
    m = keras.Model(inp, out)
    m.compile(optimizer=optimizers.Adam(1e-4),
              loss=losses.MeanSquaredError())
    m.load_weights(os.path.join(WEIGHT_DIR, f"{stock}.weights.h5"))
    return m


def ensure_preds_df():
    """Гарантированно возвращает DataFrame с нужными колонками."""
    cols = ["RSI", "Date", "ticker", "Hour"]
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH, dtype={"Date": str})
    else:
        df = pd.DataFrame(columns=cols)
    for c in cols:
        if c not in df.columns:
            df[c] = ""
    return df


def routine_all_windows():
    now = datetime.datetime.now()
    cutoff = now - datetime.timedelta(days=DAYS_BACK)

    df_preds = ensure_preds_df()

    df_preds["Date_dt"] = pd.to_datetime(
        df_preds["Date"],
        format="%d %b %Y %H:00",
        dayfirst=True,
        errors="coerce"
    ).dt.floor("H")

    df_preds = df_preds[df_preds["Date_dt"] >= cutoff].copy()
    existing = set(zip(df_preds["ticker"], df_preds["Date_dt"]))

    for stock in stocks:
        path = os.path.join(DATA_DIR, f"dataset_{stock}_hourly.csv")
        if not os.path.exists(path):
            print(f"[{stock}] файл не найден → пропускаем")
            continue

        df = pd.read_csv(path, parse_dates=["Date"])
        df = df[df["Date"] >= cutoff]
        n = len(df)
        if n < WINDOW:
            print(f"[{stock}] строк {n} < WINDOW={WINDOW} → нечего прогнозировать")
            continue

        scalers = load_scalers(stock)
        df_norm = df.copy()
        for feat, sc in scalers.items():
            if feat in df_norm.columns:
                df_norm[feat] = sc.transform(
                    df_norm[feat].values.reshape(-1, 1)
                )
        feats = df_norm.select_dtypes("float64").columns.tolist()
        df_norm[feats] = df_norm[feats].ffill().fillna(0)
        Xall = df_norm[feats].values

        model = restore_model(stock, input_shape=(WINDOW, len(feats)))

        # 3a) все скользящие окна
        for i in range(WINDOW, n):
            ts = df.loc[i, "Date"].floor("H")
            key = (stock, ts)
            if key in existing:
                continue
            X = Xall[i - WINDOW:i].reshape(1, WINDOW, len(feats))
            pred = model.predict(X, verbose=0)
            rsi = float(scalers["RSI"].inverse_transform(pred)[0, 0])
            new = {
                "RSI": rsi,
                "Date": ts.strftime("%d %b %Y %H:00"),
                "ticker": stock,
                "Hour": ts.hour
            }
            df_preds = pd.concat([df_preds, pd.DataFrame([new])], ignore_index=True)
            existing.add(key)
            print(f"[{stock}] {ts} → RSI={rsi:.4f}")

        last_hour = df["Date"].iloc[-1].floor("H")
        next_ts = last_hour + datetime.timedelta(hours=1)
        key2 = (stock, next_ts)
        if key2 not in existing:
            Xlast = Xall[-WINDOW:].reshape(1, WINDOW, len(feats))
            pred2 = model.predict(Xlast, verbose=0)
            rsi2 = float(scalers["RSI"].inverse_transform(pred2)[0, 0])
            new2 = {
                "RSI": rsi2,
                "Date": next_ts.strftime("%d %b %Y %H:00"),
                "ticker": stock,
                "Hour": next_ts.hour
            }
            df_preds = pd.concat([df_preds, pd.DataFrame([new2])], ignore_index=True)
            existing.add(key2)
            print(f"[{stock}] {next_ts} (next hour) → RSI={rsi2:.4f}")

    df_preds = df_preds[["RSI", "Date", "ticker", "Hour"]]
    df_preds.to_csv(CSV_PATH, index=False)
    print(f"\n=== Все предсказания сохранены в {CSV_PATH} ===\n")


def run_inference():
    while True:
        now = datetime.datetime.now()
        if now.minute == 4:
            print(f"\n=== {now} : обновляем данные + делаем прогнозы ===")
            update_data()
            time.sleep(5)
            routine_all_windows()
            time.sleep(60)


if __name__ == "__main__":
    run_inference()
