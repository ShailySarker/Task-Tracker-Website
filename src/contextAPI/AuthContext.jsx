import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authLogin, authRegister, getProfile } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getProfile();
          setUser(userData);
        }
      } catch (err) {
        console.log(err)
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { token, ...userData } = await authLogin(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (name, email, password, country) => {
    try {
      const { token, ...userData } = await authRegister(name, email, password, country);
      localStorage.setItem('token', token);
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

