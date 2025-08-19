import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    // Validación básica
    if (!usuario || !contrasena) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: contrasena }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Error al registrar');

      setMensaje(data.msg || 'Registro exitoso');
      setUsuario('');
      setContrasena('');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
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
      <h2 style={{ textAlign: 'center' }}>Crear cuenta</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
          style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          required
        />

        <button
          type="submit"
          disabled={loading || !usuario || !contrasena}
          style={{
            padding: '0.7rem',
            backgroundColor: loading ? '#999' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {mensaje && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
          {mensaje} - Redirigiendo...
        </p>
      )}
      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Register;
