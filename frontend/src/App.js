import React, { useState, useEffect } from 'react';
import { authService } from './services/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          await authService.verify();
          setUser(JSON.parse(savedUser));
          setCurrentPage('dashboard');
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentPage('login');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f172a' }}>
        <div style={{ color: '#fff', fontSize: '18px' }}>Cargando...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('login');
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  // Dashboard
  if (user && currentPage === 'dashboard') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: '#fff',
        padding: '40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#fff' }}>💪 FitPro</h1>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Salir
            </button>
          </div>

          <div style={{
            background: '#1a2847',
            padding: '30px',
            borderRadius: '12px'
          }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>
              ¡Bienvenido, {user.firstName}! 👋
            </h2>
            <p style={{ color: '#aaa', marginBottom: '10px' }}>
              Tu rol: <strong style={{ color: '#fff' }}>{user.role === 'trainer' ? 'Entrenador' : 'Cliente'}</strong>
            </p>
            <p style={{ color: '#aaa', marginTop: '20px' }}>
              Email: <strong style={{ color: '#fff' }}>{user.email}</strong>
            </p>
            <p style={{ color: '#aaa', marginTop: '20px', fontSize: '12px' }}>
              ✅ Backend conectado: https://fitness-platform-vobh.onrender.com/api
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login page
  if (currentPage === 'login') {
    return <LoginPage setUser={handleLoginSuccess} setPage={setCurrentPage} />;
  }

  // Register page
  if (currentPage === 'register') {
    return <RegisterPage setUser={handleRegisterSuccess} setPage={setCurrentPage} />;
  }

  return null;
}

export default App;
