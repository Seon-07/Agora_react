import React, {useState, useEffect} from 'react';
import Input from "../common/Input.tsx";
import Button from "../common/Button.tsx";
import {getStompClient} from "../../api/stompClient.ts";
import axiosInstance from "../../api/axiosInstance.ts";

interface ChatMessage {
    id: string;
    message: string;
    senderType : string;
    senderNickname: string;
    senderDttm: string;
}

interface Props {
    roomId: string;
}

const RoomMain: React.FC<Props> = ({roomId}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!roomId) return;
        const client = getStompClient();
        if (client.connected) {
            const chatSub = client.subscribe("/topic/room/" + roomId + "/chat", (message) => {
                const chat: ChatMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, chat]);
            });
            return () => {
                chatSub.unsubscribe();
            };
        }
    }, [roomId]);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;
        try {
            await axiosInstance.post(apiUrl + "/api/chat", {
                roomId: roomId,
                message: inputMessage
            });
            setInputMessage("");
        } catch (err) {
            console.error("메시지 전송 실패:", err);
        }
    };

    return (
        <div className="flex flex-col space-y-4 h-full p-2 border-sky-200 border-x">
            <div className="h-9/10 overflow-y-auto space-y-2">
                {messages.map((chat, idx) => (
                    <div key={idx} className="p-2 rounded bg-gray-100">
                        <span className="font-bold">{chat.senderNickname}: </span>
                        {chat.message}
                    </div>
                ))}
            </div>
            <div className="h-1/10 flex items-center px-3 gap-2 p-2">
                <div className="w-10/12 md:w-11/12">
                    <Input
                        placeholder="메시지를 입력하세요"
                        value={inputMessage}
                        onChange={setInputMessage}
                    />
                </div>
                <div className="w-2/12 md:w-1/12">
                    <Button
                        onClick={sendMessage}
                        variant="primary"
                        label="전송"
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomMain;