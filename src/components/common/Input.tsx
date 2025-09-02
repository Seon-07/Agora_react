import React from 'react';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange, type = 'text', disabled = false,}) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
        </div>
    );
};

export default Input;