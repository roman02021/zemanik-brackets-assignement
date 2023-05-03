import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';
import SearchResult from './components/SearchResult';
import Search from './components/Search';
import { ApiResponse, Character } from './interfaces';
import Pagination from './components/Pagination';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [amountOfPages, setAmountOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [url, setUrl] = useState<string>(
        `${import.meta.env.VITE_API_ROOT}people/?page=1`
    );
    const [searchCategory, setSearchCategory] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Character[]>([]);

    const [showOnlyWomen, setShowOnlyWomen] = useState<boolean>(false);

    const { data, isLoading, error } = useFetchData<ApiResponse>(url);

    function handleSearch(e: FormEvent<HTMLInputElement>) {
        setSearchTerm(e.currentTarget.value);
    }

    // function showOnlyWomen(e: FormEvent<HTMLInputElement>) {
    //     if (data !== null && data.results !== null) {
    //         if (e.currentTarget.checked === true) {
    //             setFilteredData(
    //                 data.results.filter(
    //                     (x) => x.gender.toLowerCase() === 'female'
    //                 )
    //             );
    //         } else {
    //             setFilteredData(data?.results);
    //         }
    //     }
    // }

    const showLoader = () => <div>Loading</div>;

    useEffect(() => {
        if (data !== null) {
            setFilteredData(
                data.results.filter((x) =>
                    showOnlyWomen ? x.gender.toLowerCase() === 'female' : x
                )
            );
        }
    }, [showOnlyWomen]);

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
            setFilteredData(data.results);
            setAmountOfPages(Math.round(data.count / 10));
        }
    }, [data]);

    useEffect(() => {
        setUrl(
            `${
                import.meta.env.VITE_API_ROOT
            }/people?page=1&search=${searchTerm}`
        );
        setCurrentPage(1);
    }, [searchTerm, searchCategory]);

    useEffect(() => {
        setUrl(
            `${
                import.meta.env.VITE_API_ROOT
            }people/?page=${currentPage}&search=${searchTerm}`
        );
    }, [currentPage]);

    return (
        <>
            <input
                className="hidden m-auto sm:flex items-center w-72 space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                type="text"
                onChange={handleSearch}
            />
            <label htmlFor="characters">Show only women</label>
            <input
                type="checkbox"
                onChange={(e) => setShowOnlyWomen(e.currentTarget.checked)}
            />
            {isLoading && showLoader()}

            {!error && filteredData !== null && (
                <ul>
                    {filteredData.map((character) => (
                        <SearchResult
                            key={character.name}
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
