import { useEffect, useRef } from 'react';
import './Input.scss';

type InputProps = {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ type, placeholder, value, onChange }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input
        className="input"
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}