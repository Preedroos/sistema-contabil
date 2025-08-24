import React, { useState } from 'react';

function Register({ onRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg('Usuário cadastrado com sucesso!');
        onRegister(data); // opcional: logar direto após registro
      } else {
        setMsg(data.message || 'Erro ao cadastrar usuário');
      }
    } catch (err) {
      setMsg('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {msg && <span className="text-red-500 text-sm">{msg}</span>}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
