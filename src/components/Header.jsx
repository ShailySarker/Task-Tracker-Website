import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import DarkModeToggle from './DarkModeToggle';
import { MdTask } from 'react-icons/md';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.warning("Logout successfully!", { duration: 3000 });
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto xl:px-20 lg:px-16 md:px-8 px-5 xl:py-5 md:py-4 py-3 flex justify-between items-center">
                <Link to="/">
                    <h2 className="font-bold text-blue-700 xl:text-3xl md:text-2xl text-xl flex items-center xl:gap-3 lg:gap-2 md:gap-[6px] gap-1"><MdTask />Task Tracker</h2>
                </Link>
                <div className="flex items-center space-x-4">
                    {/* <DarkModeToggle /> */}
                    {user ? (
                        <>
                            <span className="md:block hidden text-gray-700 dark:text-gray-300 font-medium">Hello, <span className='text-blue-700 font-semibold'>{user.name}</span></span>
                            {/* <Link
                                to="/dashboard"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
                            >
                                Dashboard
                            </Link> */}
                            <button
                                onClick={handleLogout}
                                className="bg-amber-300 px-4 md:py-2 py-[6px] md:text-base text-sm rounded-xl font-medium shadow text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;