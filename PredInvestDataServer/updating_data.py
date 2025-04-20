import os
import time
import datetime
import pandas as pd
import numpy as np
import warnings
from moexalgo import Ticker

warnings.filterwarnings("ignore")
pd.set_option('display.max_rows', 40)
pd.set_option('display.max_columns', 500)

# Список тикеров (без YNDX)
tickers = [
    'AFLT', 'ALRS', 'CHMF', 'GAZP', 'GMKN',
    'LKOH', 'MGNT', 'MOEX', 'MTSS', 'NVTK',
    'SBER', 'TATN', 'VTBR'
]


##########################################
# --- Функции для расчета признаков ---
##########################################

def compute_SMA_10(df):
    df = df.copy()
    df['SMA_10'] = df['close'].rolling(window=10).mean()
    return df


def compute_EMA_10(df):
    df = df.copy()
    df['EMA_10'] = df['close'].ewm(span=10, adjust=False).mean()
    return df


def compute_SMA_50(df):
    df = df.copy()
    df['SMA_50'] = df['close'].rolling(window=50).mean()
    return df


def compute_EMA_50(df):
    df = df.copy()
    df['EMA_50'] = df['close'].ewm(span=50, adjust=False).mean()
    return df


def apply_moving_averages(df):
    df = compute_SMA_10(df)
    df = compute_EMA_10(df)
    df = compute_SMA_50(df)
    df = compute_EMA_50(df)
    return df


def compute_VWAP(df, window=20):
    df = df.copy()
    df['typical_price'] = (df['high'] + df['low'] + df['close']) / 3.0
    df['VWAP'] = (df['typical_price'] * df['volume']).rolling(window=window).sum() / df['volume'].rolling(
        window=window).sum()
    df.drop('typical_price', axis=1, inplace=True)
    return df


def compute_rolling_std_20(df, window=20):
    df = df.copy()
    df['rolling_std_20'] = df['close'].rolling(window=window).std()
    return df


def compute_ATR_14(df, period=14):
    df = df.copy()
    df['prev_close'] = df['close'].shift(1)
    df['H-L'] = df['high'] - df['low']
    df['H-PC'] = abs(df['high'] - df['prev_close'])
    df['L-PC'] = abs(df['low'] - df['prev_close'])
    df['TR'] = df[['H-L', 'H-PC', 'L-PC']].max(axis=1)
    df['ATR_14'] = df['TR'].rolling(window=period).mean()
    df.drop(['prev_close', 'H-L', 'H-PC', 'L-PC', 'TR'], axis=1, inplace=True)
    return df


def compute_OBV(df):
    df = df.copy()
    obv = [0]
    for i in range(1, len(df)):
        if df['close'].iloc[i] > df['close'].iloc[i - 1]:
            obv.append(obv[-1] + df['volume'].iloc[i])
        elif df['close'].iloc[i] < df['close'].iloc[i - 1]:
            obv.append(obv[-1] - df['volume'].iloc[i])
        else:
            obv.append(obv[-1])
    df['OBV'] = obv
    return df


def compute_MACD(df, short_span=12, long_span=26):
    df = df.copy()
    ema_short = df['close'].ewm(span=short_span, adjust=False).mean()
    ema_long = df['close'].ewm(span=long_span, adjust=False).mean()
    df['MACD'] = ema_short - ema_long
    return df


def compute_MACD_signal(df, signal_span=9):
    df = df.copy()
    df['MACD_signal'] = df['MACD'].ewm(span=signal_span, adjust=False).mean()
    return df


def compute_MACD_diff(df):
    df = df.copy()
    df['MACD_diff'] = df['MACD'] - df['MACD_signal']
    return df


def compute_Williams_R_hourly(df, period=14):
    df = df.copy()
    highest_high = df['high'].rolling(window=period).max()
    lowest_low = df['low'].rolling(window=period).min()
    df['Williams_%R_hourly'] = -100 * (highest_high - df['close']) / (highest_high - lowest_low)
    return df


def compute_Price_deviation_SMA50_hourly(df, window=50):
    df = df.copy()
    sma50 = df['close'].rolling(window=window).mean()
    df['Price_deviation_SMA50_hourly'] = (df['close'] - sma50) / sma50 * 100
    return df


def compute_HourlyReturn(df):
    df = df.copy()
    df['HourlyReturn'] = df['close'].pct_change() * 100
    return df


def compute_Momentum_5_hourly(df, period=5):
    df = df.copy()
    df['Momentum_5_hourly'] = df['close'] - df['close'].shift(period)
    return df


def compute_RollingVol_10_hourly(df, window=10):
    df = df.copy()
    df['RollingVol_10_hourly'] = df['close'].pct_change().rolling(window=window).std() * 100
    return df


def compute_RelativeVolume_hourly(df, window=20):
    df = df.copy()
    df['RelativeVolume_hourly'] = df['volume'] / df['volume'].rolling(window=window).mean()
    return df


def compute_RSI_hourly(df, period=14):
    df = df.copy()
    delta = df['close'].diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()
    rs = avg_gain / avg_loss
    df['RSI'] = 100 - (100 / (1 + rs))
    return df


def apply_hourly_indicators(df):
    df = df.copy()
    df = apply_moving_averages(df)  # SMA_10, EMA_10, SMA_50, EMA_50
    df = compute_MACD(df)
    df = compute_MACD_signal(df)
    df = compute_MACD_diff(df)
    df = compute_ATR_14(df)
    df = compute_OBV(df)
    df = compute_VWAP(df)
    df = compute_rolling_std_20(df)
    df = compute_Williams_R_hourly(df)
    df = compute_Price_deviation_SMA50_hourly(df)
    df = compute_HourlyReturn(df)
    df = compute_Momentum_5_hourly(df)
    df = compute_RollingVol_10_hourly(df)
    df = compute_RelativeVolume_hourly(df)
    df = compute_RSI_hourly(df)
    return df


#####################################
# Функция для приведения колонки и порядка
#####################################

def finalize_df(df, ticker):
    """
    Приводит столбцы DataFrame к требуемому виду и порядку:
      ['Date', 'ticker', 'Open', 'Close', 'High', 'Low', 'Volume', 'value', 'end',
       'SMA_10', 'EMA_10', 'SMA_50', 'EMA_50', 'MACD_signal', 'MACD_diff', 'ATR_14', 'OBV',
       'VWAP', 'rolling_std_20', 'Williams_%R_hourly', 'Price_deviation_SMA50_hourly',
       'HourlyReturn', 'Momentum_5_hourly', 'RollingVol_10_hourly', 'RelativeVolume_hourly', 'RSI']
    Предполагается, что исходные столбцы имеют нижний регистр ('date', 'open', 'close', 'high', 'low', 'volume'),
    а столбцы 'value' и 'end' уже присутствуют.
    Добавляется столбец 'ticker' со значением ticker.
    """
    df = df.copy()
    # Обеспечиваем наличие столбцов со стандартными именами
    df['Date'] = df['date']  # из столбца date
    df['Open'] = df['open']
    df['Close'] = df['close']
    df['High'] = df['high']
    df['Low'] = df['low']
    df['Volume'] = df['volume']
    df['ticker'] = ticker
    # Задаём итоговой порядок столбцов:
    desired_order = ['Date', 'ticker', 'Open', 'Close', 'High', 'Low', 'Volume', 'value', 'end',
                     'SMA_10', 'EMA_10', 'SMA_50', 'EMA_50', 'MACD_signal', 'MACD_diff',
                     'ATR_14', 'OBV', 'VWAP', 'rolling_std_20', 'Williams_%R_hourly',
                     'Price_deviation_SMA50_hourly', 'HourlyReturn', 'Momentum_5_hourly',
                     'RollingVol_10_hourly', 'RelativeVolume_hourly', 'RSI']
    # Для отсутствующих столбцов добавляем пустые значения
    for col in desired_order:
        if col not in df.columns:
            df[col] = np.nan
    df = df[desired_order]
    return df


#####################################
# Функция обновления часовых данных, сохраняющих данные за последний месяц
#####################################

def update_df():
    """
    Для каждого тикера из tickers:
      - Если файл datasets_hourly/dataset_{ticker}_hourly.csv не существует или пустой,
        загружает данные с MOEX за последний месяц (30 дней от текущего момента).
      - Если файл существует и содержит данные, оставляет только данные за последние 30 дней,
        затем проверяет, есть ли данные за последний час; если нет — догружает недостающие данные с MOEX,
        объединяет их с имеющимися, чтобы итоговый DataFrame содержал данные за последние 30 дней.
      - Применяет вычисление всех индикаторов через apply_hourly_indicators,
        приводит столбцы к требуемому порядку через finalize_df и сохраняет CSV.
    """
    base_dir = "datasets_hourly"
    os.makedirs(base_dir, exist_ok=True)
    now = datetime.datetime.now()
    cutoff = now - datetime.timedelta(days=3)  # данные за последние 30 дней

    for ticker in tickers:
        file_path = os.path.join(base_dir, f"dataset_{ticker}_hourly.csv")

        # Флаг, показывающий, нужно ли загружать полный месяц
        full_month_load = False

        if os.path.exists(file_path):
            try:
                df_existing = pd.read_csv(file_path, sep=',')
                # Приводим имена столбцов к нижнему регистру для корректной обработки
                df_existing.columns = df_existing.columns.str.strip().str.lower()
                df_existing['date'] = pd.to_datetime(df_existing['date'])
            except Exception as e:
                print(f"[{ticker}] Ошибка чтения файла: {e}")
                full_month_load = True
            else:
                # Если DataFrame пустой, загрузим полный месяц
                if df_existing.empty:
                    full_month_load = True
                else:
                    # Оставляем только данные за последние 30 дней
                    df_existing = df_existing[df_existing['date'] >= cutoff]
                    # Если после фильтрации нет данных — тоже выполняем полную загрузку
                    if df_existing.empty:
                        full_month_load = True
        else:
            full_month_load = True

        if full_month_load:
            print(
                f"[{ticker}] Файл отсутствует или пуст. Загружаем данные за полный месяц (с {cutoff.strftime('%Y-%m-%d')} по {now.strftime('%Y-%m-%d')})...")
            try:
                ticker_obj = Ticker(ticker)
                df_existing = ticker_obj.candles(start=cutoff.strftime("%Y-%m-%d"),
                                                 end=now.strftime("%Y-%m-%d"),
                                                 period='1h')
            except Exception as e:
                print(f"[{ticker}] Ошибка загрузки месячных данных: {e}")
                continue
            if df_existing.empty:
                print(f"[{ticker}] Месячные данные пусты.")
                continue
            # Приводим столбец 'begin' к 'date'
            df_existing.columns = df_existing.columns.str.strip().str.lower()
            if "begin" in df_existing.columns:
                df_existing["begin"] = pd.to_datetime(df_existing["begin"])
                df_existing = df_existing.rename(columns={"begin": "date"})
        else:
            # Если у нас имеются данные (df_existing), определяем последнюю дату и догружаем новые данные
            last_date = df_existing['date'].max()
            print(f"[{ticker}] Последняя дата в файле до обновления: {last_date}")
            if last_date < now:
                new_start = last_date + datetime.timedelta(hours=1)
                new_start_str = new_start.strftime("%Y-%m-%d")
                end_str = now.strftime("%Y-%m-%d")
                print(f"[{ticker}] Догружаем данные с {new_start_str} до {end_str}...")
                try:
                    ticker_obj = Ticker(ticker)
                    df_new = ticker_obj.candles(start=new_start_str, end=end_str, period='1h')
                except Exception as e:
                    print(f"[{ticker}] Ошибка загрузки новых данных: {e}")
                    df_new = pd.DataFrame()
                if not df_new.empty:
                    df_new.columns = df_new.columns.str.strip().str.lower()
                    if "begin" in df_new.columns:
                        df_new["begin"] = pd.to_datetime(df_new["begin"])
                        df_new = df_new.rename(columns={"begin": "date"})
                    df_new = df_new[df_new['date'] > last_date]
                    if not df_new.empty:
                        df_existing = pd.concat([df_existing, df_new], ignore_index=True)
                        df_existing = df_existing.sort_values(by='date').reset_index(drop=True)
            else:
                print(f"[{ticker}] Данные уже актуальны до {now}.")

        # В любом случае – оставляем только данные за последние 30 дней
        df_existing = df_existing[df_existing['date'] >= cutoff]

        # Применяем индикаторы ко всему DataFrame
        df_updated = apply_hourly_indicators(df_existing)
        # Приводим столбцы к требуемому порядку и именам
        df_final = finalize_df(df_updated, ticker)

        try:
            df_final.to_csv(file_path, index=False)
            print(f"[{ticker}] Файл обновлён. Последняя дата: {df_final['Date'].max()}")
        except Exception as e:
            print(f"[{ticker}] Ошибка сохранения файла: {e}")


#####################################
# Главная функция main()
#####################################


def update_data():
    print("Запуск обновления часовых данных...")
    update_df()
