export type StatusTarefa = "pending" | "in_progress" | "done";

export interface Tarefa {
  id: string;
  title: string;
  description: string;
  status: StatusTarefa;
  createdAt: string;
  updatedAt: string | null;
}
