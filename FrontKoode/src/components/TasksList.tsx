import { useEffect, useState } from "react";
import { deleteTask, finishTask, getTasks } from "../services/tarefasServices";

export function TasksList({ onEditTask }: { onEditTask: (task: any) => void }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleDeleteTask(id: number) {
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

  async function handleFinishTask(id: number) {
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
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-10 bg-gray-800 rounded-lg">
        {tasks.length === 0 ? (
          <p className="text-orange-400">Nenhuma tarefa encontrada.</p>
        ) : isLoading ? (
          <p className="text-orange-400">Carregando tarefas...</p>
        ) : (
          <div className="flex flex-col gap-4 p-10 bg-gray-800 rounded-lg">
            {tasks.map((task: any) => (
              <div key={task.id} className="bg-gray-700 p-4 rounded-lg gap-2 flex flex-col">
                <h3 className="text-xl font-bold text-orange-400">{task.title}</h3>
                <p className="text-gray-300">{task.description}</p>
                <p
                  className={
                    task.status === "Pendente"
                      ? "text-yellow-500"
                      : task.status === "Em Progresso"
                        ? "text-blue-500"
                        : "text-green-500"
                  }
                >
                  {task.status}
                </p>
                <button
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => onEditTask(task)}
                  disabled={task.status === "Concluída" || isLoading}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={isLoading}
                >
                  Excluir
                </button>
                {task.status !== "Concluída" && (
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
