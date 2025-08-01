import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [usuario, setUsuario] = React.useState('');
  const [contrasena, setContrasena] = React.useState('');
  const [mensaje, setMensaje] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backend-telemetria.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: contrasena }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || 'Error al registrar');

      setMensaje(data.msg || 'Registro exitoso');
      setError('');
      setUsuario('');
      setContrasena('');

      // Redirigir a login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Error al registrar');
      setMensaje('');
    }
  };

  return (
    <div style={{ /* estilos */ }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {/* inputs */}
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p style={{ color: 'green' }}>{mensaje} - Redirigiendo a login...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
