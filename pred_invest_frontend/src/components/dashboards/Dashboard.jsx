import Plot from 'react-plotly.js';
import {Card} from 'antd';
import './dashboard.css';
import {formatShortDate} from "@/utils/dashboards.js";


export default function Dashboard({data, chartType, duration}) {
    const x = data.map(item => item.fullDate);
    const y = data.map(item => item.rsi);
    const mainColor = chartType === 'bar' ? '#82ca9d' : '#8884d8'


    const sliceSize = duration === 'month' ? 100 : 20

    const tickVals = x.filter((_, i) => i % sliceSize === 0);
    const tickText = tickVals.map(formatShortDate);

    const trace = {
        x,
        y,
        type: chartType === 'line' ? 'scatter' : 'bar',
        mode: chartType === 'line' ? 'lines' : undefined,
        marker: {color: mainColor},
        line: {width: 2},
        name: 'RSI',
        hovertemplate: `<b>Date</b>: <span>%{x}</span><br><b>RSI</b>: <span>%{y}</span><extra></extra>`,
    };

    const layout = {
        title: 'Overview',
        xaxis: {
            title: 'Date',
            tickangle: -45,
            tickmode: 'array',
            tickvals: tickVals,      // реальные значения
            ticktext: tickText,      // отформатированные подписи
            showgrid: true,
            nticks: 10
        },
        yaxis: {
            title: 'RSI',
            showgrid: true,
        },
        margin: {l: 50, r: 50, b: 50, t: 50},
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: '#FFF',  // фон тултипа
            font: {
                color: mainColor,  // цвет текста в тултипе
            },
            bordercolor: mainColor, // цвет границы тултипа
        },
    };

    return (
        <Card style={{borderRadius: '12px'}}>
            <h2 className="mb-4">Overview</h2>
            <Plot
                data={[trace]}
                layout={layout}
                useResizeHandler
                style={{width: '100%', height: '400px'}}
                config={{responsive: true}}
            />
        </Card>
    );
}
