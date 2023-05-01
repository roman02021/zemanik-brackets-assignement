import { useEffect, useState } from 'react';

interface Response<T> {
    data: T | null;
    isLoading: boolean;
    error: unknown;
}

function useFetchData<T>(url: string): Response<T> {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);
    const [data, setData] = useState<T | null>(null);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        } catch (error) {
            setError(error as Error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!url) return;

        getData();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetchData;
