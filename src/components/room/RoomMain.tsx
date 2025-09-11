import React, {useState, useEffect} from 'react';
import Input from "../common/Input.tsx";
import Button from "../common/Button.tsx";
import {getStompClient} from "../../api/stompClient.ts";
import axiosInstance from "../../api/axiosInstance.ts";
import {useAuthStore} from "../../stores/authStore.ts";
import ChatBox from "./chat/ChatBox.tsx";

interface ChatMessage {
    id: string;
    message: string;
    senderType : string;
    senderNickname: string;
    senderDttm: string;
}

interface Props {
    roomId: string;
    pro : string | null;
    con : string | null;
}

const RoomMain: React.FC<Props> = ({roomId, pro, con}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const { nickname } = useAuthStore();

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
            await axiosInstance.post("/api/chat", {
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
            <div className="flex justify-between px-4 py-2 border-b text-sm font-bold">
            {nickname === pro ? (
                <>
                    <div><span className="text-red-600">반대측:</span> <span>{con}</span></div>
                    <div><span className="text-blue-600">찬성측:</span> <span>{pro}</span></div>
                </>
            ) : (
                <>
                    <div><span className="text-blue-600">찬성측:</span> <span>{pro}</span></div>
                    <div><span className="text-red-600">반대측:</span> <span>{con}</span></div>
                </>
            )}
            </div>
            <div className="h-9/10 overflow-y-auto space-y-2">
                {messages.map((chat, idx) => {
                    let align: "left" | "right" = "left";
                    let color: "blue" | "gray" | "green" = "gray";

                    if (nickname != pro && nickname != con) {
                        color = "green";
                        align = chat.senderType === "PRO" ? "left" : "right";
                    } else {
                        if (chat.senderNickname === nickname) {
                            align = "right";
                            color = "blue";
                        } else {
                            align = "left";
                            color = "gray";
                        }
                    }

                    return (
                        <ChatBox
                            key={idx}
                            message={chat.message}
                            align={align}
                            color={color}
                        />
                    );
                })}
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