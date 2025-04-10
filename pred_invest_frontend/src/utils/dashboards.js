export const formatDashboardResponse = (response, duration) => {
    return response.map(val => {
        return {
            rsi: val.rsi.toFixed(4),
            fullDate: val.date,
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

export const formatShortDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() % 100;
    return `${day}/${month}/${year}`;
};