import { useEffect, useState } from 'react';
import { Character } from '../interfaces';

interface Props {
    character: Character;
    index: number;
}

function SearchResult(props: Props) {
    const [showResult, setShowResult] = useState<boolean>(false);

    console.log(props.index);

    useEffect(() => {
        setTimeout(() => {
            setShowResult(true);
        }, 50 * (props.index + 1));
    }, []);

    console.log(showResult);

    return (
        <li
            className={`flex items-center rounded-lg  bg-slate-900 mb-4 overflow-hidden last:mb-0 transition-all opacity-0 translate-y-1/2 ${
                showResult ? 'opacity-100' : ''
            } ${showResult ? 'translate-y-px' : ''}`}
        >
            <img className="h-12" src={props.character.image}></img>
            <span className="ml-4">{props.character.name}</span>
        </li>
    );
}

export default SearchResult;
