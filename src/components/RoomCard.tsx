import React from 'react';

interface RoomCardProps {
    name: string;
    topic: string;
    status: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, topic, status }) => {
    return (
        <div className="border border-[#4296FF] rounded-lg p-4 w-full">
            <h2 className="font-bold text-base mb-1 truncate">{name}</h2>
            <p className="text-sm text-gray-700 mb-2 truncate">{topic}</p>
            <span className="text-xs text-gray-500">{status}</span>
        </div>
    );
};

export default RoomCard;