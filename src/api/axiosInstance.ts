import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // 세션 만료 → 로그인 페이지로 이동
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;