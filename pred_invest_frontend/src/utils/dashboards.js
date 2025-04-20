export const formatDashboardResponse = (response, duration) => {

    return response.map(val => {
        return {
            rsi: parseFloat(val.rsi.toFixed(4)),
            fullDate: val.date ?? val.fullDate,
        };

    });
}


export function formatDataTypeResponse(dataTypes) {
    return dataTypes.map(item => (
        {
            value: item,
            label: item,
        }
    ))
}

export const formatShortDate = (dateStr, duration = 'month') => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    let res = `${day}/${month}`;
    if (duration === 'day') {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        res += `\n\n${hours}:${minutes}`;
    }
    return res
};