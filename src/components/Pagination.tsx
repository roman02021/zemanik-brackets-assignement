import { useEffect, useState } from 'react';
import Button from './Button';
import ChevronLeft from '../assets/ChevronLeft';
import ChevronRight from '../assets/ChevronRight';

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
    }

    useEffect(() => {
        createPageArray(range);
    }, [currentPage, amountOfPages]);

    return (
        <div className="mt-4 flex items-center justify-center">
            {currentPage !== 1 && (
                <Button onClick={prevPage}>
                    <ChevronLeft className="w-6 transition-all h-6 hover:-translate-x-0.5" />
                </Button>
            )}

            {pages.map((page) => (
                <Button
                    className={`${page === currentPage ? 'bg-slate-600' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Button>
            ))}
            {currentPage !== amountOfPages && (
                <Button onClick={nextPage}>
                    <ChevronRight className="w-6 transition-all h-6 hover:translate-x-0.5" />
                </Button>
            )}
        </div>
    );
}

export default Pagination;
