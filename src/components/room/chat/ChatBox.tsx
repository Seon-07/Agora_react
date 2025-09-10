import React from "react";

interface ChatBoxProps {
    message: string;
    align: "left" | "right";
    color: "blue" | "gray" | "green";
}

const ChatBox: React.FC<ChatBoxProps> = ({ message, align, color }) => {
    let bgColor = "bg-gray-200 text-black";
    if (color === "blue") bgColor = "bg-blue-500 text-white";
    if (color === "green") bgColor = "bg-green-400 text-white";

    const alignClass = align === "right" ? "justify-end" : "justify-start";

    return (
        <div className={"flex w-full mb-2 " + alignClass}>
            <div className={"px-3 py-2 rounded-2xl max-w-xs break-words " + bgColor}>
                {message}
            </div>
        </div>
    );
};

export default ChatBox;