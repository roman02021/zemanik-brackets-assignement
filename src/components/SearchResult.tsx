import { useEffect, useState } from 'react';
import { Character } from '../interfaces';

interface Props {
    character: Character;
    index: number;
}

function SearchResult({ character, index }: Props) {
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShowResult(true);
        }, 50 * (index + 1));
    }, []);

    return (
        <li
            className={`flex items-center rounded-lg  bg-blue-500 bg-opacity-25 border-white border-2 border-opacity-10 mb-4 overflow-hidden transition-all opacity-0 translate-y-1/2 ${
                showResult ? 'opacity-100' : ''
            } ${showResult ? 'translate-y-px' : ''}`}
        >
            <img
                alt={character.name}
                className="h-24 w-20 object-cover"
                src={character.image}
            ></img>
            <span className="ml-4 font-semibold">{character.name}</span>
        </li>
    );
}

export default SearchResult;
