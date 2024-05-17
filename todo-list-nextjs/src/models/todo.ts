import { TodoCardStatus } from "./todoCardStatus";

export type Todo = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  type: TodoCardStatus;
  completed?: boolean;
  status?: string;
};
