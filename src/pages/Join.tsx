import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/common/Input.tsx";
import {toast} from "sonner";
import axiosInstance from "../api/axiosInstance.ts";
import axios from "axios";
import {errorHandler} from "../utils/errorHandler.ts";

const Join: React.FC = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [email, setEmail] = useState("");

    const handleJoin = async () => {
        if (pw !== pwConfirm) {
            toast.warning("비밀번호가 일치하지 않습니다.");
            return;
        }
        const data = {
            userId: userId,
            pw: pw,
            name: name,
            nickname: nickname,
            email: email,
        };
        try {
            const response = await axiosInstance.post('/api/auth/join', data);
            if(response.data.status === 200){
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
        <div className="flex flex-col justify-center items-center h-screen w-screen pb-24">
            <h1 className="text-2xl font-bold mb-6">회원가입</h1>
            <div className="w-64 space-y-3">
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요."
                    value={userId}
                    onChange={setUserId}
                />
                <Input
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={pw}
                    onChange={setPw}
                />
                <Input
                    label="비밀번호 확인"
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요."
                    value={pwConfirm}
                    onChange={setPwConfirm}
                />
                <Input
                    label="이름"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    value={name}
                    onChange={setName}
                />
                <Input
                    label="닉네임"
                    type="text"
                    placeholder="사용하실 닉네임을 입력해주세요."
                    value={nickname}
                    onChange={setNickname}
                />
                <Input
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={setEmail}
                />
            </div>

            <button
                onClick={handleJoin}
                className="bg-blue-500 text-white px-4 py-2 rounded w-64 mt-6"
            >
                회원가입
            </button>
            <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:underline text-sm mt-2"
            >
                뒤로가기
            </button>
        </div>
    );
};

export default Join;