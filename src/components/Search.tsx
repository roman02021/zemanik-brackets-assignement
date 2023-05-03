import { FormEvent, Dispatch, SetStateAction } from 'react';
import SearchIcon from '../assets/SearchIcon';

interface Props {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: Dispatch<SetStateAction<string>>;
}
function Search({ onSubmit, onChange }: Props) {
    return (
        <form className="flex justify-center mb-4 w-full" onSubmit={onSubmit}>
            <div className="relative w-full sm:w-72">
                <input
                    className="m-auto sm:flex items-center sm:w-72 w-full mx-auto   space-x-3 px-4 h-12 bg-blue-500 bg-opacity-20 rounded-md hover:bg-opacity-30 focus:bg-opacity-30"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onChange(e.currentTarget.value)}
                ></input>
                <SearchIcon className="absolute right-2 fill-white pointer-events-none top-1/2 -translate-y-1/2" />
            </div>
        </form>
    );
}

export default Search;
