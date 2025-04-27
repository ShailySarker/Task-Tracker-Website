import React from 'react';
import { Route, Routes } from 'react-router';
import LandingPage from '../pages/LandingPage/LandingPage';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProjectPage from '../pages/ProjectPage/ProjectPage';

const Routers = () => {
    return (
        <Routes>
            <Route
                index
                element={<LandingPage />}
            />
            <Route
                path="/home"
                element={<Home />}
            />
            <Route
                path="/"
                element={<MainLayout />}
            >
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projects/:projectId"
                    element={
                        <PrivateRoute>
                            <ProjectPage />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Routers;