import { message } from 'antd'

export function useToast() {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const warning = (message) => {
        messageApi.open({
            type: 'warning',
            content: message,
        });
    };

    return [{
        success,
        error,
        warning,
        INTERNET_ERROR_MESSAGE:"Erro: Verifique sua conexão de internet",
    }, contextHolder]
}