import React, { useEffect, useState } from 'react';

interface Props {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    amountOfPages: number;
    range: number;
}

function Pagination({
    currentPage,
    setCurrentPage,
    amountOfPages,
    range,
}: Props) {
    const [pages, setPages] = useState<number[]>([]);

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage < amountOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function createPageArray(range: number) {
        const leftSiblingIndex = Math.max(currentPage - range, 1);

        const rightSiblingIndex = Math.min(currentPage + range, amountOfPages);

        const pageArray = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => i + leftSiblingIndex
        );
        setPages(pageArray);
        console.log('YOOO', pageArray);
    }

    useEffect(() => {
        createPageArray(range);
    }, [currentPage, amountOfPages]);

    return (
        <div className="mt-4">
            {currentPage !== 1 && <button onClick={prevPage}>Prev</button>}

            {pages.map((page) => (
                <button
                    className={`${page === currentPage ? 'bg-slate-600' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage !== amountOfPages && (
                <button onClick={nextPage}>Next</button>
            )}
        </div>
    );
}

export default Pagination;
