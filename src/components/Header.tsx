import logo from '../assets/images/FAIR_IN.png';
import axiosInstance from "../api/axiosInstance.ts";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler.ts";
import CommonIcon from '../components/CommonIcon';

const Header = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        (async function fetchUsername() {
            try {
                const response = await axiosInstance.get(apiUrl + '/api/user/nickname');
                const username = response.data.data;
                setUsername(username);
            } catch (error) {
                console.error('닉네임 요청 실패:', error);
            }
        })();
    }, [apiUrl]);

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post(apiUrl + '/api/auth/logout');
            if (response.data.status === 200) {
                toast.success(response.data.message);
                navigate('/');
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
        <header className="flex justify-between items-center px-4">
            <img src={logo} alt="logo" className="h-16" />
            <div className="flex items-center">
                <span>{username}</span>
                <span className="font-bold mx-1"> 님</span>
                <CommonIcon name="faRightFromBracket" className="ml-4 mr-1" />
                <button onClick={handleLogout} className="bg-transparent border-none text-gray-700 hover:text-black">
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default Header;