import type { MouseEventHandler, ReactNode } from "react";
import './Button.scss';

type ButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};


export default function Button({
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
}: ButtonProps) {
    return (
        <button
        className={`button ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}