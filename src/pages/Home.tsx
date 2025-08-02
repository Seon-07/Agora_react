import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import RoomCard from '../components/RoomCard';

interface Room {
    id: string;
    name: string;
    topic: string;
    status: string;
}

type RoomStatus = 'WAITING' | 'ONGOING' | 'CLOSED';

const Home = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('WAITING');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get(
                    apiUrl + '/api/room/list?status=' + selectedStatus
                );
                setRooms(res.data.data);
            } catch (err) {
                console.error('방 목록 요청 실패:', err);
            }
        })();
    }, [selectedStatus]);

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setSelectedStatus('WAITING')}
                    className={
                        'px-4 py-2 border-b-2 ' +
                        (selectedStatus === 'WAITING' ? 'border-blue-500 font-bold' : 'border-transparent')
                    }
                >
                    대기중
                </button>
                <button
                    onClick={() => setSelectedStatus('ONGOING')}
                    className={
                        'px-4 py-2 border-b-2 ' +
                        (selectedStatus === 'ONGOING' ? 'border-blue-500 font-bold' : 'border-transparent')
                    }
                >
                    진행중
                </button>
                <button
                    onClick={() => setSelectedStatus('CLOSED')}
                    className={
                        'px-4 py-2 border-b-2 ' +
                        (selectedStatus === 'CLOSED' ? 'border-blue-500 font-bold' : 'border-transparent')
                    }
                >
                    종료
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {rooms.map((room, idx) => (
                    <RoomCard
                        key={idx}
                        id={room.id}
                        name={room.name}
                        topic={room.topic}
                        status={room.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;