import { useEffect, useState } from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';
import SearchResult from './components/SearchResult';
import Search from './components/Search';
import { ApiResponse } from './interfaces';

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data, isLoading, error } = useFetchData<ApiResponse>(
        'https://swapi.py4e.com/api/people/?page=1'
    );

    const showLoader = () => <div>Loading</div>;

    return (
        <>
            <Search />
            {isLoading && showLoader()}

            {!error && data !== null && (
                <ul>
                    {data.results?.map((character) => (
                        <SearchResult character={character} />
                    ))}
                </ul>
            )}
        </>
    );
}

export default App;
