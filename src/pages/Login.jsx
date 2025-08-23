import React from 'react';

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Por enquanto, apenas simula o login
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
