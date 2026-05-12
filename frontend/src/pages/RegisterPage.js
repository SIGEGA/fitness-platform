import React, { useState } from 'react';
import { authService } from '../services/api';

function RegisterPage({ setUser }) {
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
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💪 FitPro</h1>
        <p style={styles.subtitle}>Crear Cuenta</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              style={{...styles.input, flex: 1}}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              style={{...styles.input, flex: 1, marginLeft: '10px'}}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            style={styles.input}
            required
          />

          <div style={styles.roleSection}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="role"
                value="client"
                checked={formData.role === 'client'}
                onChange={handleChange}
              />
              Cliente
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="role"
                value="trainer"
                checked={formData.role === 'trainer'}
                onChange={handleChange}
              />
              Entrenador
            </label>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p style={styles.divider}>¿Ya tienes cuenta?</p>

        <button
          onClick={() => window.location.href = '/login'}
          style={styles.link}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to br, #0f172a, #1e293b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: '14px',
  },
  roleSection: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    flex: 1,
    padding: '12px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#fff',
  },
  button: {
    padding: '12px',
    background: 'linear-gradient(to right, #2563eb, #06b6d4)',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
  },
  error: {
    background: 'rgba(239,68,68,0.2)',
    border: '1px solid rgba(239,68,68,0.5)',
    color: '#fca5a5',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  divider: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    margin: '20px 0',
    fontSize: '14px',
  },
  link: {
    display: 'block',
    width: '100%',
    padding: '12px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.3)',
    color: '#fff',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default RegisterPage;
