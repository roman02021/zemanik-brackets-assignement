import { Character } from '../interfaces';

interface Props {
    character: Character;
}

function SearchResult(props: Props) {
    return (
        <li className="flex items-center rounded-lg  bg-slate-500 mb-4 overflow-hidden last:mb-0">
            <img className="h-12" src={props.character.image}></img>
            <span className="ml-4">{props.character.name}</span>
        </li>
    );
}

export default SearchResult;
