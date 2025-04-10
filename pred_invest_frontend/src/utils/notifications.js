export const showErrorNotification = (api, text) => {
    api["error"]({
        message: `Something went wrong!`,
        description: text,
    });
}
export const showSuccessNotification = (api, msg, text = "") => {
    api["success"]({
        message: msg,
        description: text,
    });
}


