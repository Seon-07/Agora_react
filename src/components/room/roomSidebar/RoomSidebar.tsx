import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoomInfo from "./RoomInfo.tsx";
import Button from "../../common/Button.tsx";
import {getStompClient} from "../../../api/stompClient.ts";
import axiosInstance from "../../../api/axiosInstance.ts";
import {toast} from "sonner";
import axios from "axios";
import {errorHandler} from "../../../utils/errorHandler.ts";
import {useAuthStore} from "../../../stores/authStore.ts";
import RoomLog from "./RoomLog.tsx";

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

export interface ParticipantEvent {
    nickname: string;
    action: string;
}
const RoomSidebar: React.FC<SidebarProps> = ({ room }) => {
    const navigate = useNavigate();
    const [participants, setParticipants] = useState<string[]>([]); // 접속자 목록
    const [participantsLog, setParticipantsLog] = useState<ParticipantEvent[]>([]);
    const { id, nickname } = useAuthStore();
    const exit = async () => {
        const isPlayer = nickname == room.proNickname || nickname == room.conNickname;
        let userSide = null;
        if(isPlayer){
            userSide = nickname == room.proNickname ? "PRO" : "CON";
        }
        const data = {
            roomId : room.id,
            userId : id,
            side : userSide,
            type : 'delete',
        };
        try {
            const response = await axiosInstance.post('/api/room/exit', data);
            if (response.data.status === 200) {
                toast.success(response.data.message);
                navigate("/home");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorHandler(error);
            } else {
                toast.error('알 수 없는 오류가 발생했습니다.');
            }
        }
    };
    //현재 채팅방에 접속중인 사용자 요청
    useEffect(() => {
        if (!room.id) return;
        (async () => {
            try {
                const res = await axiosInstance.get('/api/room/participants?roomId=' + room.id);
                const all = res.data.data.paticipantsList as string[];
                const participants = all.filter(
                    (nick) => nick !== room.proNickname && nick !== room.conNickname
                );
                setParticipants(participants);
            } catch (err) {
                console.error("참가자 초기 로딩 실패:", err);
            }
        })();
    }, [room.id, room.proNickname, room.conNickname]);

    //현재 채팅방 접속자 구독
    useEffect(() => {
        if (!room.id) return;
        const client = getStompClient();
        if (client.connected) {
            const userSub = client.subscribe("/topic/room/" + room.id + "/users", (message) => {
                try {
                    const user = JSON.parse(message.body) as { nickname: string; type: string };

                    setParticipantsLog((prev) => [...prev, { nickname: user.nickname, action: user.type }]);
                    setParticipants((prev) => {
                        if (user.type === "add") {
                            return prev.includes(user.nickname) ? prev : [...prev, user.nickname];
                        } else if (user.type === "delete") {
                            return prev.filter(nick => nick !== user.nickname);
                        }
                        return prev;
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
            <RoomLog events={participantsLog} />
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