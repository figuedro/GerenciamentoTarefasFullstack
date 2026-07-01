import type { StatusTarefa } from "../types/tarefa";

export const getTasks = async () => {
  try {
    const tasks = await fetch("http://localhost:5191/tasks");
    const data = await tasks.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTask = async (task: { title: string; description: string; status: StatusTarefa }) => {
  try {
    const response = await fetch("http://localhost:5191/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id: string, task: { title: string; description: string; status: StatusTarefa }) => {
  const response = await fetch(`http://localhost:5191/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:5191/tasks/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export const finishTask = async (id: string) => {
  const task: { status: StatusTarefa } = { status: "done" };
  const response = await fetch(`http://localhost:5191/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.ok;
};
