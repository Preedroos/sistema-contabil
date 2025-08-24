import { useEffect, useState } from "react";

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Buscar dados do json-server
  useEffect(() => {
    fetch("http://localhost:3001/tarefas")
      .then(res => res.json())
      .then(data => setTarefas(data));

    fetch("http://localhost:3001/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  // Função para pegar nome do usuário responsável
  const getUsuarioNome = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    return usuario ? usuario.nome : "Não atribuído";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Dashboard de Tarefas
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Título</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Status</th>
              <th className="p-3">Prazo</th>
              <th className="p-3">Responsável</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{tarefa.titulo}</td>
                <td className="p-3">{tarefa.descricao}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      tarefa.status === "pendente"
                        ? "bg-red-500"
                        : tarefa.status === "em andamento"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {tarefa.status}
                  </span>
                </td>
                <td className="p-3">{tarefa.prazo}</td>
                <td className="p-3">{getUsuarioNome(tarefa.usuario_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
