import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to br, #0f172a, #1e293b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>💪 FitPro</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
          Plataforma de Entrenamientos Personalizados
        </p>
        <p style={{ color: '#22c55e', marginTop: '20px' }}>
          ✅ Frontend funcionando correctamente
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '20px', fontSize: '14px' }}>
          Backend: https://fitness-platform-vobh.onrender.com/api
        </p>
      </div>
    </div>
  );
}

export default App;
