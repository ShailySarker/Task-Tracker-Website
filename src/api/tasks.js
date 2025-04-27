import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from './base';

const API_URL = `${API_BASE_URL}/tasks`;

export const getTasks = async (projectId) => {
  const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`, getAuthHeader());
  return response.data;
};

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(
    `${API_URL}/projects/${projectId}/tasks`,
    taskData,
    getAuthHeader()
  );
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, getAuthHeader());
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};