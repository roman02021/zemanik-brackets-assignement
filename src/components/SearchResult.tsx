import { Character } from '../interfaces';

interface Props {
    character: Character;
}

function SearchResult(props: Props) {
    return <li>{props.character.name}</li>;
}

export default SearchResult;
