import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center xl:py-28 lg:py-24 md:py-20 py-16">
            <div
                className={`xl:w-32 xl:h-32 lg:h-28 lg:w-28 md:w-24 md:h-24 h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent`}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;