import React, { useState } from 'react';
import { authService } from '../services/api';

function RegisterPage({ setUser, setPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'client',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await authService.register(formData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    
    // Redirigir después de 500ms para que guarde los datos
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  } catch (err) {
    setError(err.response?.data?.error || 'Error en el registro');
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
          Crear Cuenta
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              style={{
                flex: 1,
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
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              style={{
                flex: 1,
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
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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

          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{
              flex: 1,
              padding: '12px',
              background: formData.role === 'client' ? '#2563eb' : '#2a3f5f',
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              <input
                type="radio"
                name="role"
                value="client"
                checked={formData.role === 'client'}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              Cliente
            </label>
            <label style={{
              flex: 1,
              padding: '12px',
              background: formData.role === 'trainer' ? '#2563eb' : '#2a3f5f',
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              <input
                type="radio"
                name="role"
                value="trainer"
                checked={formData.role === 'trainer'}
                onChange={handleChange}
                style={{ marginRight: '5px' }}
              />
              Entrenador
            </label>
          </div>

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
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#888', margin: '20px 0', fontSize: '14px' }}>
          ¿Ya tienes cuenta?
        </p>

        <button
         onClick={() => setPage('login')}
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
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
