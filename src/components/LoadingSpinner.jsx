import React from 'react';

const LoadingSpinner = ({ size = 'h-8 w-8' }) => {
    return (
        <div className="flex justify-center items-center">
            <div
                className={`${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent`}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;