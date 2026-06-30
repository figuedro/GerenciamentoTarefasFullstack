import { useEffect, useState } from "react";
import { createTask } from "../services/tarefasServices";
import type { Tarefa } from "../types/tarefa";

export function TarefasForm({ editingTarefa }: { editingTarefa: Tarefa | null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pendente");
  // const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createTask({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("Pendente");
    setIsLoading(false);
  };

  useEffect(() => {
    if (editingTarefa) {
      setTitle(editingTarefa.title);
      setDescription(editingTarefa.description);
      setStatus(editingTarefa.status);
    }
  }, [editingTarefa]);

  return (
    <>
      <form className="flex flex-col gap-4 p-10 bg-gray-800 rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-orange-400">Criar Tarefa</h1>

        <input
          type="text"
          placeholder="Título"
          className="bg-gray-600 text-white placeholder:text-gray-400 border border-gray-500 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="bg-gray-600 text-white placeholder:text-gray-400 border border-gray-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="bg-gray-600 text-white placeholder:text-gray-400 border border-gray-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluída">Concluída</option>
        </select>
        <button
          className="bg-orange-400 text-black p-2 rounded-lg cursor-pointer"
          type="reset"
          disabled={!title && !description}
          onClick={() => {
            setTitle("");
            setDescription("");
            setStatus("Pendente");
          }}
        >
          Limpar Campos
        </button>
        <button
          className="bg-orange-400 text-black p-2 rounded-lg cursor-pointer"
          type="submit"
          disabled={!title || isLoading}
        >
          Criar Tarefa
        </button>
      </form>
    </>
  );
}
