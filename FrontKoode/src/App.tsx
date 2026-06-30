import { useState } from "react";
import type { Tarefa } from "./types/tarefa";
import { TarefasForm } from "./components/tasksForm";
import { TasksList } from "./components/tasksList";

function App() {
  const [editingTarefa, setEditingTarefa] = useState<Tarefa | null>(null);
  return (
    <>
      <div className="flex flex-col items-center p-5 bg-black">
        <h1 className="text-2xl text-orange-400">Gerenciador de Tarefas</h1>
      </div>

      <div className="flex flex-col items-center p-5 bg-black">
        <TarefasForm editingTarefa={editingTarefa} />
      </div>

      <div className="flex flex-col items-center p-5 bg-black">
        <TasksList onEditTask={setEditingTarefa} />
      </div>
    </>
  );
}

export default App;
