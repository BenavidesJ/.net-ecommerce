import { ProtectedRoute } from '@/components/custom';
import { CheckoutWizard } from '@/components/custom/CheckoutWizard';
import { ShoppingCart } from '@/components/custom/ShoppingCart';
import { CreacionUsuarios, Dashboard, GestionUsuarios } from '@/pages/private';
import { CreacionProducto } from '@/pages/private/CreacionProducto';
import { GestionPedidos } from '@/pages/private/GestionPedidos';
import { GestionProductos } from '@/pages/private/GestionProductos';
import { MyOrders } from '@/pages/private/MyOrders';
import { AgregarPresentacion } from '@/pages/private/PresentacionPage';

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
        <Route
          path="/gestion-productos"
          element={
            <ProtectedRoute>
              <GestionProductos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-pedidos"
          element={
            <ProtectedRoute>
              <GestionPedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-usuarios/agregar"
          element={
            <ProtectedRoute>
              <CreacionUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-productos/agregar"
          element={
            <ProtectedRoute>
              <CreacionProducto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-productos/agregar/presentaciones"
          element={
            <ProtectedRoute>
              <AgregarPresentacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compras"
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutWizard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
