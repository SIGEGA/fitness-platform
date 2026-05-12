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
