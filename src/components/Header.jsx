import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import DarkModeToggle from './DarkModeToggle';
import { MdTask } from 'react-icons/md';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/">
                    <h2 className="font-bold text-blue-700 xl:text-3xl md:text-2xl text-xl flex items-center xl:gap-3 lg:gap-2 md:gap-[6px] gap-1"><MdTask />Calendar App</h2>
                </Link>
                <div className="flex items-center space-x-4">
                    {/* <DarkModeToggle /> */}
                    {user ? (
                        <>
                            <span className="text-gray-700 dark:text-gray-300">Hello, {user.name}</span>
                            <Link
                                to="/dashboard"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-indigo-400"
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