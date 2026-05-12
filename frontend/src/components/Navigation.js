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
