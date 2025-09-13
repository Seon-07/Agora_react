import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import RoomSidebar from "../components/room/roomSidebar/RoomSidebar.tsx";
import RoomInfo from "../components/room/roomSidebar/RoomInfo.tsx";
import RoomMain from "../components/room/RoomMain.tsx";
import {toast} from "sonner";
import {getStompClient} from "../api/stompClient.ts";

interface RoomResponse {
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

const Room : React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [room, setRoom] = useState<RoomResponse | null>(null);

    //방 접속 요청
    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get('/api/room?id=' + id);
                setRoom(res.data.data);
                toast.success(res.data.message);
            } catch (err) {
                console.error('방 입장 실패:', err);
            }
        })();
    }, [id]);

    //현재 방의 상태에 대해서 구독
    useEffect(() => {
        if (!id) return;
        const client = getStompClient();
        if (!client.connected) return;
        const stateSub = client.subscribe("/topic/room/" + id + "/state", (message) => {
            console.log("state:", JSON.parse(message.body));
        });
        return () => {
            stateSub.unsubscribe();
        };
    }, [id]);

    if (!room) return <div className="w-screen h-full flex text-center items-center">로딩중...</div>;

    return (
        <div className="flex h-full w-screen">
            <div className="w-3/12 h-full hidden md:block p-3">
                    <RoomSidebar room={room} />
            </div>
            <div className="flex flex-col w-full md:w-9/12 h-full">
                <div className="block h-1/12 md:hidden">
                    <RoomInfo name={room.name} topic={room.topic} />
                </div>
                <div className="h-11/12 md:h-full">
                    <RoomMain roomId={room.id} pro={room.proNickname} con={room.conNickname}/>
                </div>
            </div>
        </div>
    );
}
export default Room