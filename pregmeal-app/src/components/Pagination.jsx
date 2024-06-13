import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
    return (
        <div className="inline-flex items-center justify-center gap-3 mt-7 mb-7">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                className="inline-flex size-8 items-center justify-center rounded border border-lightpink bg-white text-darkpink hover:bg-lightpink rtl:rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <p className="text-small text-darkpink">
                {currentPage}
                <span className="mx-0.25">/</span>
                {totalPages}
            </p>

            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                className="inline-flex size-8 items-center justify-center rounded border border-lightpink bg-white text-darkpink hover:bg-lightpink rtl:rotate-180"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
}

export default Pagination;
