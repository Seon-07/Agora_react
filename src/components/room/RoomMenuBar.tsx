import { useNavigate } from 'react-router-dom';
import Button from "../common/Button.tsx";
import React from "react";

const RoomMenuBar: React.FC = () => {
    const navigate = useNavigate();

    const exit = () => {
        navigate("/home");
    }
    return (
        <div className="flex justify-center items-center bg-gray-100 h-20 md:h-16 px-4 md:px-2">
            <div className="h-1/10 w-full flex items-center justify-center">
                <Button
                    onClick={exit}
                    variant="default"
                    label="나가기"
                />
            </div>
        </div>
    );
};

export default RoomMenuBar;