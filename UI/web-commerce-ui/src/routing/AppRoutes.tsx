import { ProtectedRoute } from '@/components/custom';
import { Dashboard, GestionUsuarios } from '@/pages/private';

import { LandingPage, Login, Registro } from '@/pages/public';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-usuarios"
          element={
            <ProtectedRoute>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
