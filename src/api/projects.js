import axios from 'axios';
import { API_BASE_URL, getAuthHeader } from './base';

const API_URL = `${API_BASE_URL}/projects`;

export const getProjects = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData, getAuthHeader());
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/${id}`, projectData, getAuthHeader());
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};