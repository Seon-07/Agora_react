import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.post('/api/auth/reissue');
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('토큰 재발급 실패', refreshError);
            }
        }
        if (error.response?.status === 403) {
            window.location.href = '/';
            return;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;