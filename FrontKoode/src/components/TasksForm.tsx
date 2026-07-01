import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/tarefasServices";
import type { StatusTarefa, Tarefa } from "../types/tarefa";

export function TarefasForm({
  editingTarefa,
  onTaskCreated,
}: {
  editingTarefa: Tarefa | null;
  onTaskCreated?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<StatusTarefa>("pending");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (editingTarefa) {
      await updateTask(editingTarefa.id, { title, description, status });
    } else {
      await createTask({ title, description, status });
    }
    setTitle("");
    setDescription("");
    setStatus("pending");

    setIsLoading(false);
    onTaskCreated?.();
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
      <form
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-gray-800 p-6 sm:max-w-lg sm:p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-orange-400">
          {editingTarefa ? "Atualizar Tarefa" : "Criar Tarefa"}
        </h1>

        <input
          type="text"
          placeholder="Título"
          className="w-full border border-gray-500 bg-gray-600 text-white placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="w-full border border-gray-500 bg-gray-600 text-white placeholder:text-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full border border-gray-500 bg-gray-600 text-white placeholder:text-gray-400"
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusTarefa)}
        >
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="done">Concluída</option>
        </select>
        <button
          className="bg-orange-400 text-black p-2 rounded-lg cursor-pointer"
          type="button"
          disabled={!title && !description}
          onClick={() => {
            setTitle("");
            setDescription("");
            setStatus("pending");
          }}
        >
          Limpar Campos
        </button>
        <button
          className="bg-orange-400 text-black p-2 rounded-lg cursor-pointer"
          type="submit"
          disabled={!title || isLoading}
        >
          {editingTarefa ? "Atualizar Tarefa" : "Criar Tarefa"}
        </button>
      </form>
    </>
  );
}
