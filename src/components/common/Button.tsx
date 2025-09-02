import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label?: string;
    variant?: 'default' | 'primary' | 'secondary';
}
const variantClasses = {
    default: 'bg-white border border-black text-black hover:bg-gray-100',
    primary: 'bg-blue-500 text-white hover:bg-blue-600 border-none',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400 border-none',
};

const Button: React.FC<ButtonProps> = ({onClick, label = '버튼',variant = 'default',}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={"px-4 py-2 rounded-md " + variantClasses[variant]}
        >
            {label}
        </button>
    );
};

export default Button;