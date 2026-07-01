import { useState } from "react";
import type { Tarefa } from "./types/tarefa";
import { TarefasForm } from "./components/tasksForm";
import { TasksList } from "./components/tasksList";

function App() {
  const [editingTarefa, setEditingTarefa] = useState<Tarefa | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  return (
    <>
      <div className="flex flex-col items-center px-4 py-5 sm:px-6">
        <h1 className="text-2xl text-orange-400">Gerenciador de Tarefas</h1>
      </div>

      <div className="flex flex-col items-center px-4 py-5 sm:px-6">
        <TarefasForm
          editingTarefa={editingTarefa}
          onTaskCreated={() => {
            setRefreshTrigger((prev) => prev + 1);
            setEditingTarefa(null);
          }}
        />
      </div>

      <div className="flex flex-col items-center px-4 py-5 sm:px-6">
        <TasksList onEditTask={setEditingTarefa} refreshTrigger={refreshTrigger} />
      </div>
    </>
  );
}

export default App;
