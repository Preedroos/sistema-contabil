import React from 'react';

function Dashboard() {
    // Exemplo de atividades cadastradas
    const activities = [
        { id: 1, title: 'Conferir notas fiscais', status: 'Pendente' },
        { id: 2, title: 'Enviar relatórios contábeis', status: 'Concluída' },
        { id: 3, title: 'Atualizar planilhas financeiras', status: 'Pendente' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Minhas Atividades</h1>
            <div className="grid gap-4 w-full max-w-md">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="bg-white p-4 rounded shadow flex justify-between items-center"
                    >
                        <span>{activity.title}</span>
                        <div>
                            <span
                                className={`px-2 py-1 rounded text-sm font-semibold ${activity.status === 'Concluída'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-yellow-200 text-yellow-800'
                                    }`}
                            >
                                {activity.status}
                            
                            </span>
                            <button
                                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="fixed bottom-48 right-48 bg-green-500 text-white w-16 h-16 text-3xl rounded-full shadow-lg hover:bg-green-600"
            >
                +
            </button>
        </div>
    );
}

export default Dashboard;
