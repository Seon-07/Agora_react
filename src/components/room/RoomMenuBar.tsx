import { useNavigate } from 'react-router-dom';

const RoomMenuBar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-around items-center bg-gray-100 h-20 md:h-16 px-4 md:px-2">
            <button onClick={() => navigate('/home')}
                className="flex flex-col items-center hover:text-black"
            >나가기
            </button>
        </div>
    );
};

export default RoomMenuBar;