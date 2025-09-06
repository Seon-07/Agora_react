import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'sonner';
import { errorHandler } from '../utils/errorHandler';

const CreateRoom: React.FC = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [side, setSide] = useState<string | null>(null);
    const [isPrivate, setIsPrivate] = useState(false);

    const createRoom = async () => {
        const data = {
            name,
            topic,
            side: side || null ,
            isPrivate,
        };

        try {
            const res = await axiosInstance.post(apiUrl + '/api/room/create', data);
            const content = res.data.data;
            toast.success(res.data.message);
            navigate('/room/' + content.id, { state: content });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                errorHandler(error);
            } else {
                toast.error('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="방 제목"
                className="border p-2 rounded w-64"
            />
            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="주제"
                className="border p-2 rounded w-64"
            />
            <div className="flex justify-between w-64">
                <label className="flex cursor-pointer">
                    <input
                        type="radio"
                        name="side"
                        value="PRO"
                        checked={side === 'PRO'}
                        onChange={(e) => setSide(e.target.value)}
                        className="hidden"
                    />
                    <span
                        className={
                            "px-4 py-2 rounded-lg border " +
                            (side === "PRO" ? "bg-green-200 border-green-500 text-green-700" : "bg-white border-gray-300 text-gray-600")
                        }
                    >찬성
                    </span>
                </label>
                <label className="flex cursor-pointer">
                    <input
                        type="radio"
                        name="side"
                        value="CON"
                        checked={side === 'CON'}
                        onChange={(e) => setSide(e.target.value)}
                        className="hidden"
                    />
                    <span
                        className={
                            "px-4 py-2 rounded-lg border " +
                            (side === "CON" ? "bg-red-200 border-red-500 text-red-700" : "bg-white border-gray-300 text-gray-600")
                        }
                    >반대
                    </span>
                </label>
            </div>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <span>비공개 방</span>
            </label>
            <button
                onClick={createRoom}
                className="bg-blue-500 text-white px-4 py-2 rounded w-64"
            >
                방 만들기
            </button>
        </div>
    );
};

export default CreateRoom;