import { useEffect, useState } from "react";
import { deleteTask, finishTask, getTasks } from "../services/tarefasServices";
import type { Tarefa } from "../types/tarefa";

const statusLabel: Record<Tarefa["status"], string> = {
  pending: "Pendente",
  in_progress: "Em Progresso",
  done: "Concluída",
};

const statusColor: Record<Tarefa["status"], string> = {
  pending: "text-yellow-500",
  in_progress: "text-blue-500",
  done: "text-green-500",
};

type StatusFilter = "all" | Tarefa["status"];

export function TasksList({
  onEditTask,
  refreshTrigger,
}: {
  onEditTask: (task: Tarefa) => void;
  refreshTrigger?: number;
}) {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filterTasks = statusFilter === "all" ? tasks : tasks.filter((task) => task.status === statusFilter);

  async function handleGetTasks() {
    try {
      setIsLoading(true);
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      setIsLoading(true);
      await deleteTask(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleGetTasks();
    }
  }

  async function handleFinishTask(id: string) {
    try {
      setIsLoading(true);
      await finishTask(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleGetTasks();
    }
  }

  useEffect(() => {
    handleGetTasks();
  }, [refreshTrigger]);

  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-gray-800 p-6 sm:max-w-lg sm:p-10">
        <select
          className="w-full border border-gray-500 bg-gray-600 text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Todas</option>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="done">Concluída</option>
        </select>

        {isLoading ? (
          <p className="text-orange-400">Carregando tarefas...</p>
        ) : filterTasks.length === 0 ? (
          <p className="text-orange-400">Nenhuma tarefa encontrada.</p>
        ) : (
          <div className="flex w-full flex-col gap-4">
            {filterTasks.map((task) => (
              <div key={task.id} className="flex w-full flex-col gap-2 rounded-lg bg-gray-700 p-4">
                <h3 className="text-xl font-bold text-orange-400">{task.title}</h3>
                <p className="text-gray-300">{task.description}</p>
                <p className="text-gray-300">{new Date(task.createdAt).toLocaleDateString()}</p>

                <p className={statusColor[task.status]}>{statusLabel[task.status]}</p>
                {task.status !== "done" ? (
                  <button
                    className="bg-orange-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => onEditTask(task)}
                    disabled={isLoading}
                  >
                    Editar
                  </button>
                ) : (
                  <></>
                )}

                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={isLoading}
                >
                  Excluir
                </button>
                {task.status !== "done" && (
                  <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => handleFinishTask(task.id)}
                    disabled={isLoading}
                  >
                    Concluir Tarefa
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
