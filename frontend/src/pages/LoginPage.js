import React, { useState } from 'react';
import { authService } from '../services/api';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#1a2847',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '10px', color: '#fff' }}>
          💪 FitPro
        </h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '30px', fontSize: '14px' }}>
          Entrenamientos Personalizados
        </p>

        {error && (
          <div style={{
            background: '#dc2626',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#2a3f5f',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#2a3f5f',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#888', margin: '20px 0', fontSize: '14px' }}>
          ¿No tienes cuenta?
        </p>

        <button
          onClick={() => window.location.href = '/register'}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '2px solid #2563eb',
            color: '#2563eb',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
