import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoomInfo from "./RoomInfo.tsx";
import Button from "../common/Button.tsx";
import {getStompClient} from "../../api/stompClient.ts";

interface SidebarProps {
    room : {
        id: string;
        name: string;
        topic: string;
        hostNickname: string | null;
        proNickname: string | null;
        conNickname: string | null;
        status: string;
        createDttm: string;
        startDttm: string;
        endDttm: string;
        isPrivate: boolean;
    }
}

const RoomSidebar: React.FC<SidebarProps> = ({ room }) => {
    const navigate = useNavigate();

    const [participants, setParticipants] = useState<string[]>([]); // 접속자 목록

    const exit = () => {
        navigate("/home");
    };

    useEffect(() => {
        if (!room.id) {
            return;
        }
        const client = getStompClient();
        if (client.connected) {
            const userSub = client.subscribe("/topic/room/" + room.id + "/users", (message) => {
                try {
                    const user = JSON.parse(message.body) as { nickname: string };
                    setParticipants((prev) => {
                        if (prev.includes(user.nickname)) {
                            return prev; // 중복 방지
                        }
                        return [...prev, user.nickname];
                    });
                } catch (error) {
                    console.error("참가자 메시지 파싱 오류:", error);
                }
            });
            return () => {
                userSub.unsubscribe();
            };
        }
    }, [room.id]);

    return (
        <div className="w-full h-full flex flex-col space-y-6 border border-sky-200 rounded-xl p-3">
            <RoomInfo name={room.name} topic={room.topic} />
            <div className="w-full flex h-1/6">
                <div className="flex flex-col text-center w-1/2 bg-green-50 rounded-xl p-3">
                    <div className="font-bold text-green-600 mb-2">찬성</div>
                    <ul>{room.proNickname != null ? (<li>{room.proNickname}</li>) : (<li className="text-gray-400">비어있음</li>)}</ul>
                </div>
                <div className="flex flex-col text-center w-1/2 bg-red-50 rounded-xl p-3">
                    <div className="font-bold text-red-600 mb-2">반대</div>
                    <ul>{room.conNickname != null ? (<li>{room.conNickname}</li>) : (<li className="text-gray-400">비어있음</li>)}</ul>
                </div>
            </div>
            <hr />
            <div className="flex flex-col w-full text-center h-9/12">
                <h2 className="text-lg font-bold text-blue-600 mb-2">접속자 목록</h2>
                {participants.length === 0 ? (<p className="text-gray-400">접속자가 없습니다.</p>) : (
                    <table className="w-full border text-sm">
                        <tbody>
                        {participants.map((nickname, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="px-2 py-1">{nickname}</td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="h-1/12 w-full flex items-center justify-between">
                <Button
                    onClick={exit}
                    variant="default"
                    label="나가기"
                />
                <div className="flex flex-col">
                    <span className="text-gray-400">{room.createDttm.split("T")[0]}</span>
                    <span>{room.hostNickname}님 생성</span>
                </div>
            </div>
        </div>
    );
};

export default RoomSidebar;