import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';
import SearchResult from './components/SearchResult';
import Search from './components/Search';
import SearchIcon from './assets/SearchIcon';
import { ApiResponse, Character } from './interfaces';
import Pagination from './components/Pagination';
import Loader from './components/Loader';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [amountOfPages, setAmountOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [url, setUrl] = useState<string>(
        `${import.meta.env.VITE_API_ROOT}people/?page=1`
    );
    const [searchCategory, setSearchCategory] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Character[]>([]);

    const [genderFilter, setGenderFilter] = useState<string>('both');

    const { data, isLoading, error } = useFetchData<ApiResponse>(url);

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUrl(
            `${
                import.meta.env.VITE_API_ROOT
            }/people?page=1&search=${searchTerm}`
        );
        setCurrentPage(1);
    }

    function onSearchTermChange(e: FormEvent<HTMLInputElement>) {
        setSearchTerm(e.currentTarget.value);
    }

    useEffect(() => {
        if (data !== null) {
            setFilteredData(
                data.results.filter((x) =>
                    genderFilter !== 'both'
                        ? x.gender.toLowerCase() === genderFilter
                        : x
                )
            );
        }
    }, [genderFilter]);

    useEffect(() => {
        if (data !== null && data.results !== null) {
            const charactersWithImage = data.results.map((x) => {
                const startString = 'people/';
                const characterId = x.url.slice(
                    x.url.indexOf(startString) + startString.length,
                    x.url.lastIndexOf('/')
                );
                return {
                    ...x,
                    image: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
                };
            });
            data.results = charactersWithImage;
            setFilteredData(
                data.results.filter((x) =>
                    genderFilter !== 'both'
                        ? x.gender.toLowerCase() === genderFilter
                        : x
                )
            );
            setAmountOfPages(Math.round(data.count / 10));
        }
    }, [data]);

    console.log(genderFilter);

    useEffect(() => {
        setUrl(
            `${
                import.meta.env.VITE_API_ROOT
            }people/?page=${currentPage}&search=${searchTerm}`
        );
    }, [currentPage]);

    return (
        <>
            <form className="flex justify-center mb-4" onSubmit={handleSearch}>
                <div className="relative w-fit">
                    <input
                        className="m-auto sm:flex items-center w-72 space-x-3 px-4 h-12 bg-blue-500 bg-opacity-20 rounded-md hover:bg-opacity-30 focus:bg-opacity-30"
                        type="text"
                        placeholder="Search"
                        onChange={onSearchTermChange}
                    ></input>
                    <SearchIcon className="absolute right-2 fill-white pointer-events-none top-1/2 -translate-y-1/2" />
                </div>
            </form>
            <div className="flex justify-center mb-4">
                <div className="flex flex-col">
                    <label htmlFor="genderFilter">Show gender</label>
                    <select
                        className="w-72 space-x-3 px-4 h-12 bg-blue-500 bg-opacity-20 rounded-md hover:cursor-pointer hover:bg-opacity-30 focus:bg-opacity-75"
                        id="genderFilter"
                        onChange={(e) => setGenderFilter(e.currentTarget.value)}
                    >
                        <option value="both">Both</option>
                        <option value="male">Men</option>
                        <option value="female">Women</option>
                    </select>
                </div>
            </div>

            {isLoading && <Loader />}
            {filteredData.length === 0 && (
                <div>No results on page {currentPage}</div>
            )}

            {!error && filteredData !== null && (
                <ul className="grid grid-cols-2 gap-4">
                    {filteredData.map((character, i) => (
                        <SearchResult
                            key={character.name}
                            index={i}
                            character={character}
                        />
                    ))}
                </ul>
            )}
            {amountOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    amountOfPages={amountOfPages}
                    range={1}
                />
            )}
        </>
    );
}

export default App;
