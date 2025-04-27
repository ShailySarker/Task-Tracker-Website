import axios from 'axios';
import { API_BASE_URL } from './base';

const API_URL = `${API_BASE_URL}/projects`;

export const authRegister = async (name, email, password, country) => {
    const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        country,
    });
    return response.data;
};

export const authLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });
    return response.data;
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};