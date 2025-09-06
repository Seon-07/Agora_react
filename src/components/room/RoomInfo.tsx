import React from 'react';

interface Props {
    name : string,
    topic : string
}

const RoomInfo: React.FC<Props> = ({name, topic}) => {
    return (
        <div className="flex flex-col space-y-4 h-1/6 p-2">
            <div className="flex">
                <span className="w-full text-center">{name}</span>
            </div>
            <div className="flex">
                <span className="text-lg font-bold w-full text-center">{topic}</span>
            </div>
        </div>
    );
};

export default RoomInfo;