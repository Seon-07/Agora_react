import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'sonner';
import { errorHandler } from '../utils/errorHandler.ts';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');

    const login = async () => {
        const data = {
            userId: userId,
            pw: pw,
        };
        try {
            const response = await axiosInstance.post(apiUrl+'/api/auth/login', data);
            if(response.data.status === 200){
                toast.success(response.data.message);
                navigate('/dashboard');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorHandler(error);
            } else {
                toast.error('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-screen">
            <input type="text" id="userId" placeholder="아이디를 입력하세요"
                   value={userId}
                   onChange={(e) => setUserId(e.target.value)}
                   className="w-1/4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="password" id="pw" placeholder="비밀번호를 입력하세요"
                   value={pw}
                   onChange={(e) => setPw(e.target.value)}
                   className="w-1/4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <button
                onClick={login}
                className="w-1/4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600">로그인
            </button>
        </div>
    );
}
export default Login;