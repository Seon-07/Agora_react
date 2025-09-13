import React, { useRef, useEffect } from 'react';
import type { ParticipantEvent } from "./RoomSidebar.tsx";
import {useAuthStore} from "../../../stores/authStore.ts";

interface Props {
    events: ParticipantEvent[];
}

const RoomLog: React.FC<Props> = ({ events }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { nickname } = useAuthStore();
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [events]);

    return (
        <div className="w-full h-1/6 border border-gray-400 border-r-4 rounded-md overflow-y-auto p-2">
            {events.map((e, idx) => (
                <div key={idx} className="text-sm">
                    {e.action === 'add'
                        ? e.nickname === nickname ? nickname + '님 환영합니다.' : e.nickname + '님이 접속했습니다.'
                        : e.nickname + '님이 퇴장하셨습니다.'}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default RoomLog;