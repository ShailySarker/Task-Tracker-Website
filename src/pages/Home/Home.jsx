import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router';
import { MdTask } from 'react-icons/md';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="text-center h-screen flex flex-col justify-center items-center bg-blue-50">
            <div className="flex items-center justify-center gap-3 text-blue-900">
                <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Welcome to</h1>
                <MdTask className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl" />
                <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Task Tracker</h1>
            </div>
            <p className="xl:text-xl lg:text-lg md:text-base text-sm text-gray-600 dark:text-gray-300 xl:mt-6 lg:mt-3 mt-2 xl:mb-8 lg:mb-5 md:mb-4 mb-[14px]">
                Manage your projects and tasks efficiently
            </p>
            {isAuthenticated ? (
                <Link
                    to="/dashboard"
                    className="inline-flex items-center xl:px-8 px-6 xl:py-3 lg:py-2 py-[6px] border border-transparent md:text-base text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:border-2 hover:border-blue-900 hover:bg-white hover:text-blue-950"
                >
                    Go to Dashboard
                </Link>
            ) : (
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="inline-flex items-center xl:px-8 px-6 xl:py-3 lg:py-2 py-[6px] border border-transparent md:text-base text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-950"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex items-center xl:px-8 px-6 xl:py-3 lg:py-2 py-[6px] border border-gray-300 md:text-base text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;