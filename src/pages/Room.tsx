import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input.tsx";
import Button from "../components/common/Button.tsx";

const Room : React.FC = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const sendChat = () => {
        //전송로직
    };

    const exit = () => {
        navigate("/home");
    };

    return (
        <div className="flex h-full w-screen">
            <div className="w-1/6 h-full bg-gray-200 hidden md:block">
                <div className="h-9/10 w-full flex items-center justify-center">
                    접속자 목록
                </div>
                <div className="h-1/10 w-full flex items-center justify-center">
                    <Button
                        onClick={exit}
                        variant="default"
                        label="나가기"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full md:w-5/6 h-full">
                <div className="h-9/10 bg-white border-b border-gray-300">
                    Room Main
                </div>
                <div className="h-1/10 bg-gray-100 flex items-center px-3 gap-2">
                    <div className="w-10/12 md:w-11/12">
                        <Input
                            placeholder="메시지를 입력하세요"
                            value={msg}
                            onChange={setMsg}
                        />
                    </div>
                    <div className="w-2/12 md:w-1/12">
                        <Button
                            onClick={sendChat}
                            variant="primary"
                            label="전송"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Room