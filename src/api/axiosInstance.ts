import axios from 'axios';
import {toast} from "sonner";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            toast.warning("세션이 만료되었습니다. 다시 로그인해주세요.")
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;