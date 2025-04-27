import React from 'react';
import ProjectsList from './Components/ProjectsList';

const Dashboard = () => {
    return (
        <div className='bg-blue-50 xl:px-20 lg:px-14 md:px-8 px-5 min-h-screen'>
            <h1 className="xl:text-3xl md:text-2xl text-xl font-bold text-gray-800 dark:text-white mb-6 text-center xl:pt-5 md:pt-4 pt-3">Dashboard</h1>
            <ProjectsList />
        </div>
    );
};

export default Dashboard;