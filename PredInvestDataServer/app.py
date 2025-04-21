import asyncio
import json
import os

import pandas as pd
from flask import Flask, request, jsonify

import plotly.graph_objs as go
import plotly.io as pio
from datetime import datetime, timedelta
from moexalgo import Ticker
from flask_cors import CORS

from inference import run_inference, stocks

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

tickers = [
    'AFLT', 'ALRS', 'CHMF', 'GAZP', 'GMKN',
    'LKOH', 'MGNT', 'MOEX', 'MTSS', 'NVTK', 'SBER', 'TATN', 'VTBR',
]


@app.route('/api/predict')
def predict():
    symbol = request.args.get('symbol', 'SBER').upper()
    data = pd.read_csv('rsi_predictions.csv')

    data = data[data['ticker'] == symbol]
    data['Date'] = pd.to_datetime(data['Date']) - pd.Timedelta(hours=1)

    data = data.sort_values(by='Date')
    data['RSI'] = data['RSI'].shift(-2)  # сдвиг rsi на 1 шаг назад

    result = data[['Date', 'RSI']].rename(columns={'Date': 'fullDate', 'RSI': 'rsi'})
    result = result.dropna(subset=['rsi'])  # удаляем последний NaN

    # result['fullDate'] = result['fullDate'].dt.strftime('%Y-%m-%d %H:%M:%S')

    json_result = result.to_dict(orient='records')
    return jsonify(json_result)



@app.route('/api/data-types')
def data_types():
    return json.dumps(stocks)


@app.route('/api/chart')
def get_hourly_data():
    symbol = request.args.get('symbol', 'SBER')
    filename = f"dataset_{symbol}_hourly.csv"

    path = os.path.join('datasets_hourly', filename)

    if not os.path.exists(path):
        return jsonify({'error': f'Data for symbol {symbol} not found'}), 404
    df = pd.read_csv(path, parse_dates=['Date'])
    cutoff = pd.Timestamp.now() - pd.Timedelta(days=7)
    df = df[df['Date'] >= cutoff]

    df['fullDate'] = df['Date'].dt.strftime('%Y-%m-%d %H:%M:%S')
    df = df[['fullDate', 'RSI']].rename(columns={'RSI': 'rsi'})
    df = df.sort_values(by='fullDate')
    df = df.dropna(subset=['rsi'])
    output = df.to_dict(orient='records')
    return output


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=5001)

