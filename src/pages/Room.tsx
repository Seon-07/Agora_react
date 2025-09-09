import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import RoomSidebar from "../components/room/RoomSidebar.tsx";
import RoomInfo from "../components/room/RoomInfo.tsx";
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

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get(apiUrl + '/api/room?id=' + id);
                setRoom(res.data.data);
                toast.success(res.data.message);
            } catch (err) {
                console.error('방 입장 실패:', err);
            }
        })();
    }, [apiUrl, id]);

    useEffect(() => {
        if (!id) return;
        const client = getStompClient();
        if (client.connected) {
            const chatSub = client.subscribe("/topic/room/"+id+"/chat", (massage) => {
                console.log("chat:", JSON.parse(massage.body));
            });
            return () => {
                chatSub.unsubscribe();
            };
        }
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
                    <RoomMain roomId={room.id} />
                </div>
            </div>
        </div>
    );
}
export default Room