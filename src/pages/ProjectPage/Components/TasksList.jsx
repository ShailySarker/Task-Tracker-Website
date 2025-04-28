import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Notification from '../../../components/Notification';
import ProjectStats from './ProjectStats';
import { useTasks } from '../../../hooks/useTasks';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TaskForm from './TaskForm';

const TasksList = ({ projectId }) => {
    const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(projectId);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

    const handleCreate = async (taskData) => {
        try {
            await createTask(taskData);
            setShowForm(false);
            setNotification({ message: 'Task created successfully', type: 'success' });
        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
        }
    };

    const handleUpdate = async (taskId, taskData) => {
        try {
            await updateTask(taskId, taskData);
            setNotification({ message: 'Task updated successfully', type: 'success' });
        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                setNotification({ message: 'Task deleted successfully', type: 'success' });
            } catch (err) {
                setNotification({ message: err.message, type: 'error' });
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error loading tasks: {error}</div>;

    return (
        <div className="space-y-4 xl:pt-5 md:pt-4 pt-3 xl:pb-10 lg:pb-7 md:pb-8 pb-6">
            <Notification message={notification?.message} type={notification?.type} />

            <ProjectStats tasks={tasks} />

            <div className='flex flex-col gap-4 justify-center items-center'>
                <div className="flex justify-between items-center xl:mt-12 lg:mt-4 mt-1 w-full">
                    <h2 className="xl:text-2xl md:text-xl text-lg font-bold text-blue-700">Tasks</h2>
                    <div className="flex space-x-2">
                        <div className='flex space-x-2 md:block hidden'>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="rounded-xl bg-white border-2 pl-3 md:py-2 py-[6px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="all">All Tasks</option>
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl bg-white border-2 pl-3 md:py-2 py-[6px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="createdAt">Sort by Created</option>
                                <option value="title">Sort by Title</option>
                                <option value="dueDate">Sort by Due Date</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-3 py-1 border border-transparent md:text-base text-sm font-medium rounded-xl shadow-sm text-white  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            New Task
                        </button>
                    </div>
                </div>
                <div className='flex space-x-2 md:hidden visible'>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-xl bg-white border-2 pl-3 md:py-2 py-[6px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">All Tasks</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl bg-white border-2 pl-3 md:py-2 py-[6px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-base text-sm font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="createdAt">Sort by Created</option>
                        <option value="title">Sort by Title</option>
                        <option value="dueDate">Sort by Due Date</option>
                    </select>
                </div>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl-lg shadow-md mb-4 border-2 border-blue-700 rounded-xl">
                    <TaskForm
                        onSubmit={handleCreate}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {sortedTasks?.length === 0 ? (
                <div className="text-center xl:py-36 lg:py-24 md:py-20 py-16">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        {filter === 'all' ? 'No tasks yet. Create your first task!' : 'No tasks match the current filter'}
                    </p>
                </div>
            ) : (
                <div>
                    {sortedTasks?.map((task) => (
                        <TaskCard
                            key={task?._id}
                            task={task}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TasksList;