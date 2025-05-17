import { toast } from 'sonner';
import axios from 'axios';

export const errorHandler = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        toast.error('알 수 없는 오류가 발생했습니다.');
        return;
    }

    const status = error.response?.status;
    const errorData = error.response?.data;

    if (status === 400 && typeof errorData.message === 'object') {
        Object.values(errorData.message).forEach((messages: unknown) => {
            if (Array.isArray(messages)) {
                messages.forEach((msg) => toast.error(msg));
            }
        });
    } else if (typeof errorData.message === 'string') {
        toast.error(errorData.message);
    } else {
        toast.error('요청 중 오류가 발생했습니다.');
    }
};