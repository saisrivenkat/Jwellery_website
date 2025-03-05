import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminAddProduct from './components/admin/AdminAddProduct';
import AdminEditProduct from './components/admin/AdminEditProduct';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/products/add" element={
          <AdminProtectedRoute>
            <AdminAddProduct />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <AdminProtectedRoute>
            <AdminEditProduct />
          </AdminProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;