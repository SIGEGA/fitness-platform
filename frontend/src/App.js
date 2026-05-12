import React, { useState, useEffect } from 'react';
import { authService } from './services/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const response = await authService.verify();
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to br, #0f172a, #1e293b)' }}>
        <div style={{ color: '#fff', fontSize: '18px' }}>Cargando...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setPage('login');
  };

  if (!user) {
    if (page === 'login') {
      return <LoginPage setUser={setUser} />;
    } else {
      return <RegisterPage setUser={(user) => { setUser(user); setPage('login'); }} />;
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to br, #0f172a, #1e293b)', color: '#fff', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#fff' }}>💪 FitPro</h1>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Salir
          </button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '30px' }}>
          <h2 style={{ color: '#fff' }}>Bienvenido, {user.firstName}! 👋</h2>
          <p style={{ color: '#fff', marginTop: '10px' }}>Tu rol: <strong>{user.role === 'trainer' ? 'Entrenador' : 'Cliente'}</strong></p>
          <p style={{ marginTop: '20px', color: 'rgba(255,255,255,0.7)' }}>
            Email: {user.email}
          </p>
          <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
            ✅ Backend conectado: https://fitness-platform-vobh.onrender.com/api
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
