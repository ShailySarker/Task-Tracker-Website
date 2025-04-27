import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(projectId);
      setTasks(data || []);
      setError(null);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to fetch tasks'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(projectId, taskData);
      setTasks(prev => [...prev, newTask]);
      setError(null);
      return newTask;
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to create task'
      );
      throw err;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(prev => 
        prev.map(task => task._id === id ? updatedTask : task)
      );
      setError(null);
      return updatedTask;
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to update task'
      );
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
        err?.message ||
        'Failed to delete task'
      );
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    refetch: fetchTasks,
  };
};
