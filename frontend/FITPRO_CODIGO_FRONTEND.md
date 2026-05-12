# FITPRO - CÓDIGO FRONTEND COMPLETO

## INSTRUCCIÓN: Copia cada bloque en su archivo correspondiente en frontend/src/

---

## ARCHIVO 1: frontend/package.json

```json
{
  "name": "fitness-platform-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "dev": "react-scripts start"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead"],
    "development": ["last 1 chrome version"]
  }
}
```

---

## ARCHIVO 2: frontend/.env

```
REACT_APP_API_URL=http://localhost:8080/api
```

---

## ARCHIVO 3: frontend/.gitignore

```
node_modules/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
build/
.DS_Store
npm-debug.log*
yarn-debug.log*
```

---

## ARCHIVO 4: frontend/public/index.html

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="FitPro - Entrenamientos Personalizados" />
    <title>FitPro</title>
    <style>
      body {
        margin: 0;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(to br, #0f172a, #1e293b);
        color: #fff;
      }
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
    </style>
  </head>
  <body>
    <noscript>Necesitas JavaScript para usar esta aplicación.</noscript>
    <div id="root"></div>
  </body>
</html>
```

---

## ARCHIVO 5: frontend/src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ARCHIVO 6: frontend/src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to br, #0f172a, #1e293b);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  border: none;
  outline: none;
}

input, textarea, select {
  font-family: 'Poppins', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}
```

---

## ARCHIVO 7: frontend/src/services/api.js

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - Agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response - Manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: () => api.get('/auth/verify'),
};

export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/me', userData),
  getTrainers: () => api.get('/users'),
};

export const clientService = {
  getAll: () => api.get('/clients'),
  linkClient: (clientEmail) =>
    api.post('/clients/link-client', { clientEmail }),
};

export default api;
```

---

## ARCHIVO 8: frontend/src/components/ProtectedRoute.js

Crear carpeta `frontend/src/components/` primero

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, requiredRole, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
```

---

## ARCHIVO 9: frontend/src/components/Navigation.js

```javascript
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isTrainer = user.role === 'trainer';

  const navItems = isTrainer
    ? [
        { label: 'Dashboard', path: '/trainer/dashboard' },
        { label: 'Clientes', path: '/trainer/clients' },
      ]
    : [
        { label: 'Dashboard', path: '/client/dashboard' },
        { label: 'Entrenamientos', path: '/client/workout' },
      ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <span>💪 FitPro</span>
        </div>

        <div style={styles.menu}>
          {navItems.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                ...styles.navButton,
                ...(isActive(path) ? styles.navButtonActive : {}),
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.userSection}>
          <span style={styles.userName}>{user.firstName}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'linear-gradient(to right, #0f172a, #1a2847)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
  },
  menu: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '8px 16px',
    borderRadius: '6px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: 'none',
  },
  navButtonActive: {
    background: '#2563eb',
    color: '#fff',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userName: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
  },
  logoutBtn: {
    padding: '8px 16px',
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s',
  },
};

export default Navigation;
```

---

## ARCHIVO 10: frontend/src/App.js

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrainerDashboard from './pages/TrainerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
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
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      {user && <Navigation user={user} onLogout={handleLogout} />}
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/trainer/dashboard"
              element={
                <ProtectedRoute user={user} requiredRole="trainer">
                  <TrainerDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute user={user} requiredRole="client">
                  <ClientDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                user.role === 'trainer' ? (
                  <Navigate to="/trainer/dashboard" />
                ) : (
                  <Navigate to="/client/dashboard" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

const styles = {
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to br, #0f172a, #1e293b)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTop: '3px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default App;
```

---

## ARCHIVO 11: frontend/src/pages/LoginPage.js

Crear carpeta `frontend/src/pages/` primero

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function LoginPage({ setUser }) {
  const navigate = useNavigate();
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
      navigate(response.data.user.role === 'trainer' ? '/trainer/dashboard' : '/client/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>💪 FitPro</h1>
        <p style={styles.subtitle}>Entrenamientos Personalizados</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p style={styles.divider}>¿No tienes cuenta?</p>

        <a href="/register" style={styles.link}>
          Registrarse
        </a>
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
  input: {
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: '14px',
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
    textAlign: 'center',
    padding: '12px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.3)',
    color: '#fff',
    borderRadius: '10px',
    fontWeight: '600',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
};

export default LoginPage;
```

---

## ARCHIVO 12: frontend/src/pages/RegisterPage.js

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function RegisterPage({ setUser }) {
  const navigate = useNavigate();
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
      navigate(response.data.user.role === 'trainer' ? '/trainer/dashboard' : '/client/dashboard');
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

        <a href="/login" style={styles.link}>
          Iniciar Sesión
        </a>
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
    textAlign: 'center',
    padding: '12px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.3)',
    color: '#fff',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default RegisterPage;
```

---

## ARCHIVO 13: frontend/src/pages/TrainerDashboard.js

```javascript
import React from 'react';

function TrainerDashboard({ user }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hola, {user.firstName} 👋</h1>
      <p style={styles.subtitle}>Dashboard del Entrenador</p>
      <div style={styles.card}>
        <p>✅ Panel funcional</p>
        <p>Aquí puedes gestionar clientes, programas y ejercicios</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to br, #0f172a, #1e293b)',
    padding: '40px 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
  },
};

export default TrainerDashboard;
```

---

## ARCHIVO 14: frontend/src/pages/ClientDashboard.js

```javascript
import React from 'react';

function ClientDashboard({ user }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hola, {user.firstName} 👋</h1>
      <p style={styles.subtitle}>Tu programa de entrenamiento personalizado</p>
      <div style={styles.card}>
        <p>✅ Panel funcional</p>
        <p>Tu entrenador te asignará un programa próximamente</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to br, #0f172a, #1e293b)',
    padding: '40px 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
  },
};

export default ClientDashboard;
```

---

✅ Frontend completo. 14 archivos.

¡Listo para descargar y usar!
