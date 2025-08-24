import React, { useState, useEffect } from 'react';

function Dashboard({ user }) {
  const [activities, setActivities] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const fetchActivities = async () => {
    const response = await fetch(`http://localhost:3001/atividades?usuario_id=${user.id}`);
    const data = await response.json();
    setActivities(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = async () => {
    if (!newTitle) return;
    await fetch('http://localhost:3001/atividades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario_id: user.id, titulo: newTitle }),
    });
    setNewTitle('');
    fetchActivities();
  };

  // Atualizar status da atividade
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pendente' ? 'Concluída' : 'Pendente';
    await fetch(`http://localhost:3001/atividades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: activities.find(a => a.id === id).titulo, status: newStatus }),
    });
    fetchActivities();
  };

  // Excluir atividade
  const deleteActivity = async (id) => {
    await fetch(`http://localhost:3001/atividades/${id}`, { method: 'DELETE' });
    fetchActivities();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Minhas Atividades</h1>

      <div className="flex mb-4 gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Nova atividade"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={addActivity}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <div className="grid gap-4 w-full max-w-md">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>{activity.titulo}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleStatus(activity.id, activity.status)}
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  activity.status === 'Concluída'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {activity.status}
              </button>
              <button
                onClick={() => deleteActivity(activity.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
