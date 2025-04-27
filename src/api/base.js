export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };