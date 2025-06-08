import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({onClick, label = '버튼', className = '',}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-2 rounded bg-white border border-black text-black hover:bg-gray-100 ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;