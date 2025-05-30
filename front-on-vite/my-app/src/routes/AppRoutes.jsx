import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../context/AuthContext';
import ClientList from '../components/clients/ClientList';
import ClientForm from '../components/clients/ClientForm';
import ServiceList from '../components/services/ServiceList';
import ServiceForm from '../components/services/ServiceForm';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentForm from '../components/appointments/AppointmentForm';
import Register from '../components/auth/Register';
import UserList from '../components/adminpage/Users';
import UserForm from '../components/adminpage/UserForm';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<h2>Страница не найдена</h2>} />
      <Route
        path="/clients"
        element={user ? <ClientList /> : <Navigate to="/login" />}
      />
      <Route
        path="/clients/new"
        element={user ? <ClientForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/services"
        element={user ? <ServiceList /> : <Navigate to="/login" />}
      />
      <Route
        path="/services/new"
        element={
          user && user.user.role === 'admin' ? (
            <ServiceForm />
          ) : (
            <Navigate to="/services" />
          )
        }
      />
      <Route
        path="/services/:id/edit"
        element={
          user && user.user.role === 'admin' ? (
            <ServiceForm />
          ) : (
            <Navigate to="/services" />
          )
        }
      />
      <Route
        path="/appointments"
        element={user ? <AppointmentList /> : <Navigate to="/login" />}
      />
      <Route
        path="/appointments/new"
        element={user ? <AppointmentForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/appointments/:id/edit"
        element={user ? <AppointmentForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={user && user.user.role === 'admin' ? <UserList /> : <Navigate to="/" />}
      />
      <Route
        path="/users/:id/edit"
        element={user && user.user.role === 'admin' ? <UserForm /> : <Navigate to="/" />}
      />


    </Routes>
  );
};

export default AppRoutes;
