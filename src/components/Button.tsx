import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
}

function Button({ onClick, children, className }: Props) {
    return (
        <button
            className={`${className} w-8 h-8 flex justify-center items-center p-2 rounded-lg`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
