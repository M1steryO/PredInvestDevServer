import Plot from 'react-plotly.js';
import {Card} from 'antd';
import './dashboard.css';
import {formatShortDate} from "@/utils/dashboards.js";

export default function Dashboard({
                                      data1,
                                      data2,
                                      chartType,
                                      duration,
                                      title,
                                      color1,
                                      color2,
                                      label1 = 'Ticker 1',
                                      label2 = 'Ticker 2'
                                  }) {

    const prepareTrace = (data, color, label) => {
        const x = data.map(item => new Date(item.fullDate));
        const y = data.map(item => item.rsi);

        return {
            x,
            y,
            type: chartType === 'line' ? 'scatter' : 'bar',
            mode: chartType === 'line' ? 'lines' : undefined,
            marker: {color},
            line: {width: 2},
            name: label,
            hovertemplate: `<b>Date</b>: <span>%{x}</span><br><b>${label} RSI</b>: <span>%{y}</span><extra></extra>`,
        };
    };

    const x = data1.map(item => new Date(item.fullDate)); // общая ось X
    let sliceSize = 1;
    switch (duration) {
        case 'week':
            sliceSize = 20;
            break;
        case 'month':
            sliceSize = 100;
            break;
    }
    const tickVals = x.filter((_, i) => i % sliceSize === 0);
    const tickText = tickVals.map(val => formatShortDate(val, duration));
    console.log(data1);
    const trace1 = prepareTrace(data1, color1, label1);
    const trace2 = prepareTrace(data2, color2, label2);

    const layout = {
        title,
        xaxis: {
            title: 'Date',
            tickangle: -45,
            tickmode: 'array',
            tickvals: tickVals,
            ticktext: tickText,
            showgrid: true,
            nticks: 10
        },
        yaxis: {
            title: 'RSI',
            showgrid: true,
        },
        margin: {l: 100, r: 100, b: 75, t: 30},
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: '#FFF',
            font: {
                color: '#000',
            },
            bordercolor: '#ccc',
        },
    };

    return (
        <Card style={{borderRadius: '12px'}}>
            <h2>{title}</h2>
            <Plot
                data={[trace1, trace2]}
                layout={layout}
                useResizeHandler
                style={{width: '100%', height: '450px'}}
                config={{responsive: true}}
            />
        </Card>
    );
}
