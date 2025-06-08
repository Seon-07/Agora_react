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
                navigate('/home');
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
        <>
            <div className="flex flex-col items-center justify-center space-y-4 h-screen">
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디"
                    className="border p-2 rounded w-64"
                />
                <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="비밀번호"
                    className="border p-2 rounded w-64"
                />
                <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded w-64">
                    로그인
                </button>
            </div>
        </>
    );
}
export default Login;