import json
import pandas as pd
from flask import Flask, request, jsonify

import plotly.graph_objs as go
import plotly.io as pio
from datetime import datetime, timedelta
from moexalgo import Ticker
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

tickers = [
    'AFLT', 'ALRS', 'CHMF', 'GAZP', 'GMKN',
    'LKOH', 'MGNT', 'MOEX', 'MTSS', 'NVTK', 'SBER', 'TATN', 'VTBR',
]


def get_date_range(interval):
    today = datetime.today()
    if interval == 'week':
        start_date = today - timedelta(days=7)
    elif interval == 'month':
        start_date = today - timedelta(days=30)
    elif interval == 'year':
        start_date = today - timedelta(days=365)
    else:
        start_date = today - timedelta(days=30)
    return start_date.strftime('%Y-%m-%d'), today.strftime('%Y-%m-%d')


def load_moex_data(symbol, start_date, end_date):
    # Получение свечей с MOEX (дневные данные)
    ticker = Ticker(symbol)
    df = ticker.candles(start=start_date, end=end_date)

    # Преобразование даты
    df['begin'] = pd.to_datetime(df['begin'])
    df = df.rename(columns={'begin': 'date'})

    # Скользящая средняя (SMA)
    df['sma'] = df['close'].rolling(window=5).mean()

    # RSI расчёт вручную
    df['delta'] = df['close'].diff()
    df['gain'] = df['delta'].clip(lower=0)
    df['loss'] = -df['delta'].clip(upper=0)
    df['avg_gain'] = df['gain'].rolling(window=14).mean()
    df['avg_loss'] = df['loss'].rolling(window=14).mean()
    df['rs'] = df['avg_gain'] / df['avg_loss']
    df['rsi'] = 100 - (100 / (1 + df['rs']))

    df = df[df['rsi'].notna()]
    df = df[df['sma'].notna()]

    return df[['date', 'close', 'sma', 'rsi']]


# Построение графика
def build_chart(df, chart_type, symbol):
    if chart_type == 'close':
        trace = go.Scatter(x=df['date'], y=df['close'], mode='lines', name='Close Price')
    elif chart_type == 'sma':
        trace = go.Scatter(x=df['date'], y=df['sma'], mode='lines', name='SMA (5)')
    elif chart_type == 'rsi':
        trace = go.Scatter(x=df['date'], y=df['rsi'], mode='lines', name='RSI (14)')
    else:
        trace = go.Scatter(x=df['date'], y=df['close'], mode='lines', name='Close Price (default)')

    fig = go.Figure(data=[trace])
    fig.update_layout(title=f"{symbol.upper()} — {chart_type.upper()}", xaxis_title="Date",
                      yaxis_title=chart_type.upper(), height=500)
    return pio.to_html(fig, full_html=False, include_plotlyjs='cdn')


@app.route('/api/data-types')
def data_types():
    return json.dumps(tickers)


@app.route('/api/chart')
def chart_api():
    symbol = request.args.get('symbol', 'SBER').upper()
    chart_type = request.args.get('chart_type', 'close')
    interval = request.args.get('interval', 'month')  # 'week', 'month', 'year'

    if symbol not in tickers:
        return f"Invalid symbol. Available: {', '.join(tickers)}", 400

    start_date, end_date = get_date_range(interval)

    df = load_moex_data(symbol, start_date, end_date)
    return jsonify(df.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True, port=5001)
