import { forwardRef } from 'react';
import './Input.scss';

type InputProps = {
    type: string;
    placeholder: string;
    value: string;
    className?: string;
    maxLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, placeholder, value, className, maxLength, onChange, onKeyDown }, ref) => {
    return (
        <input
            className={`input ${className}`}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
        />
    );
});

export default Input;