import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects'; 

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data || []); // Safe fallback
      setError(null); // Clear previous error if successful
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to fetch projects'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to create project'
      );
      throw err;
    }
  };

  const handleUpdateProject = async (id, projectData) => {
    try {
      const updatedProject = await updateProject(id, projectData);
      setProjects(prev => 
        prev.map(project => project._id === id ? updatedProject : project)
      );
      return updatedProject;
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to update project'
      );
      throw err;
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(project => project._id !== id));
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to delete project'
      );
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject: handleCreateProject,
    updateProject: handleUpdateProject,
    deleteProject: handleDeleteProject,
    refetch: fetchProjects,
  };
};
