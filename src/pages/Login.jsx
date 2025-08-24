import React, { useState } from 'react';

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const user = await response.json();

      if (!response.ok) {
        setError(user.message || 'Erro no login');
        return;
      }

      onLogin(user);
    } catch (err) {
      setError('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>

        {/* Botão para alternar para cadastro */}
        <div className="text-center mt-4">
          <button
            onClick={onShowRegister}
            className="text-blue-500 underline"
          >
            Criar uma conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
