import React, {useState} from 'react';
import Input from "../common/Input.tsx";
import Button from "../common/Button.tsx";



const RoomMain: React.FC<null> = () => {
    const [msg, setMsg] = useState('');

    return (
        <div className="flex flex-col space-y-4 h-full p-2 border-sky-200 border-x">
            <div className="h-9/10">

            </div>
            <div className="h-1/10 flex items-center px-3 gap-2 p-2">
                <div className="w-10/12 md:w-11/12">
                    <Input
                        placeholder="메시지를 입력하세요"
                        value={msg}
                        onChange={setMsg}
                    />
                </div>
                <div className="w-2/12 md:w-1/12">
                    <Button
                        onClick={()=>{}}
                        variant="primary"
                        label="전송"
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomMain;