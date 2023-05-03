import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';
import SearchResult from './components/SearchResult';
import Search from './components/Search';
import { ApiResponse, Character } from './interfaces';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import Filter from './components/Filter';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [amountOfPages, setAmountOfPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [url, setUrl] = useState<string>(
        `${import.meta.env.VITE_API_ROOT}people/?page=1`
    );
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
                //extract id from url
                const characterId = x.url.slice(
                    x.url.indexOf(startString) + startString.length,
                    x.url.lastIndexOf('/')
                );
                //create an object with copied values + image
                return {
                    ...x,
                    image: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
                };
            });
            data.results = charactersWithImage;
            //filter data if filter is set
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

    useEffect(() => {
        setUrl(
            `${
                import.meta.env.VITE_API_ROOT
            }people/?page=${currentPage}&search=${searchTerm}`
        );
    }, [currentPage]);

    return (
        <>
            <Search onChange={setSearchTerm} onSubmit={handleSearch} />
            <Filter onChange={setGenderFilter} />
            {isLoading && <Loader />}
            {filteredData.length === 0 && (
                <div>No results on page {currentPage}</div>
            )}

            {!error && filteredData !== null && (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filteredData.map((character, i) => (
                        <SearchResult
                            key={character.created}
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
