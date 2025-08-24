import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (loggedUser) => setUser(loggedUser);
  const handleRegister = (newUser) => setUser(newUser);

  return (
    <div>
      {user ? (
        <Dashboard user={user} />
      ) : showRegister ? (
        <Register onRegister={handleRegister} />
      ) : (
        <Login
          onLogin={handleLogin}
          onShowRegister={() => setShowRegister(true)}
        />
      )}

      {/* Botão de voltar para login na tela de registro */}
      {!user && showRegister && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowRegister(false)}
            className="text-blue-500 underline"
          >
            Voltar ao login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
