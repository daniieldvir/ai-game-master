import { forwardRef } from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            className={`input ${className || ''}`}
            ref={ref}
            {...props}
        />
    );
});

export default Input;