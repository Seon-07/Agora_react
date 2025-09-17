import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'sonner';
import { errorHandler } from '../utils/errorHandler.ts';
import { activateStompClient } from '../api/stompClient';
import logo from "../assets/images/agora_logo.png";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');

    const login = async () => {
        const data = {
            userId: userId,
            pw: pw,
        };
        try {
            const response = await axiosInstance.post('/api/auth/login', data);
            if(response.data.status === 200){
                toast.success(response.data.message);
                //웹소켓 활성화
                activateStompClient();
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
        <div className="flex flex-col justify-center items-center h-screen w-screen pb-24">
            <img src={logo} alt="logo" className="h-52 object-contain" />
            <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디"
                className="border p-2 rounded w-64 mb-4"
            />
            <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호"
                className="border p-2 rounded w-64 mb-4"
            />
            <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded w-64">
                로그인
            </button>
            <div className="flex space-x-4 mt-3">
                <button
                    onClick={() => navigate('/join')}
                    className="text-blue-500 hover:underline"
                >
                    회원가입
                </button>
            </div>
        </div>
    );
}
export default Login;