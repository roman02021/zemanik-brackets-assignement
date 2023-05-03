import { ReactNode } from 'react';

interface Props {
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
}

function Button({ onClick, children, className }: Props) {
    return (
        <button
            className={`${className} bg-blue-500 bg-opacity-25 mh-4 mx-2 w-8 h-8 flex justify-center items-center p-2 rounded-lg`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
