import React, { useState } from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await fetch('https://backend-telemetria.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: usuario, password: contrasena })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || 'Credenciales inválidas');
    }

    // Aquí puedes guardar el token en localStorage si tu backend lo devuelve
    // localStorage.setItem('token', data.token);

    onLogin(); // Login exitoso
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '5rem auto',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.7rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </form>

      <div style={{ /* tus estilos */ }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* inputs y botón de login */}
      </form>

      {/* 👇 Botón para ir al registro */}
      <button
        onClick={() => navigate('/register')}
        style={{
          marginTop: '1rem',
          padding: '0.6rem',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Crear cuenta
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
    
    </div>
  );
};

export default Login;
