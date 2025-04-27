import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Notification from '../../../components/Notification';
import ProjectForm from './ProjectForm';
import ProjectCard from './ProjectCard';

const ProjectsList = () => {
    const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleCreate = async (projectData) => {
        try {
            await createProject(projectData);
            setShowForm(false);
            setNotification({ message: 'Project created successfully', type: 'success' });
        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
        }
    };

    const handleUpdate = async (projectData) => {
        try {
            await updateProject(editingProject?._id, projectData);
            setEditingProject(null);
            setNotification({ message: 'Project updated successfully', type: 'success' });
            setShowForm(false);
        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                setNotification({ message: 'Project deleted successfully', type: 'success' });
            } catch (err) {
                setNotification({ message: err.message, type: 'error' });
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error loading projects: {error}</div>;

    return (
        <div className="space-y-6">
            <Notification message={notification.message} type={notification.type} />

            <div className="flex justify-between items-center">
                <h2 className="xl:text-2xl md:text-xl text-lg font-bold text-blue-700 dark:text-white">My Projects</h2>
                <button
                    onClick={() => {
                        setEditingProject(null);
                        setShowForm(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    New Project
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 border-blue-700">
                    <ProjectForm
                        onSubmit={editingProject ? handleUpdate : handleCreate}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProject(null);
                        }}
                        initialData={editingProject || {}}
                    />
                </div>
            )}

            {projects?.length === 0 ? (
                <div className="text-center xl:py-36 lg:py-24 md:py-20 py-16">
                    <p className="text-gray-500 dark:text-gray-400">You don't have any projects yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects?.map((project) => (
                        <div key={project?._id} className="relative">
                            <ProjectCard project={project} />
                            <div className="absolute top-2 right-2 space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingProject(project);
                                        setShowForm(true);
                                    }}
                                    className="p-1 font-semibold md:text-base text-sm text-blue-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project?._id)}
                                    className="p-1 font-semibold md:text-base text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsList;