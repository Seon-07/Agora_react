import React from 'react';
import {useNavigate} from 'react-router-dom';

interface RoomCardProps {
    id: string;
    name: string;
    topic: string;
    status: string;
}

const RoomCard: React.FC<RoomCardProps> = ({id, name, topic, status }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/room/' + id);
    };

    return (
        <div onClick={handleClick}
             className="border border-[#4296FF] rounded-lg p-4 w-full cursor-pointer
                       hover:shadow-md hover:bg-blue-50 transform hover:scale-[1.02] transition">
            <h2 className="font-bold text-base mb-1 truncate">{name}</h2>
            <p className="text-sm text-gray-700 mb-2 truncate">{topic}</p>
            <span className="text-xs text-gray-500">{status}</span>
        </div>
    );
};

export default RoomCard;