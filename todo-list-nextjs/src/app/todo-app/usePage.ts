import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  fetchTodosDb,
  addTodo,
  updateTodo,
  removeTodo,
} from "../../lib/firebase/setting";
import { Todo } from "../../models/todo";

export const usePage = () => {
  useParams();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTodo() {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/todos`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setTodos(data.todos);
      const dataFromFirebase = await fetchTodosDb();
      setTodos(Object.values(dataFromFirebase));
    } catch (e) {
      throw new Error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleInprogress = async (id: number) => {
    try {
      setIsLoading(true);
      await updateTodo({
        id,
        completed: false,
        status: "inprogress",
      });
      fetchTodo();
    } catch (e) {
      throw new Error("Failed to update data");
    }
  };

  const customHandleSubmit = async (
    title: string,
    description: string,
    deadline: string,
    onSuccess: () => void
  ) => {
    try {
      setIsLoading(true);
      await addTodo({
        title,
        deadline,
        description,
      });
      if (typeof onSuccess === "function") {
        onSuccess();
        fetchTodo();
        return;
      }
      setIsLoading(false);
    } catch (e) {
      throw new Error("Failed to add data");
    }
  };

  const handleHold = async (id) => {
    try {
      setIsLoading(true);
      await updateTodo({
        id,
        completed: false,
        status: "hold",
      });
      fetchTodo();
    } catch (e) {
      throw new Error("Failed to update data");
    }
  };

  const handleCompleted = async (id: number) => {
    try {
      setIsLoading(true);
      await updateTodo({
        id,
        completed: true,
        status: "completed",
      });
      fetchTodo();
    } catch (e) {
      throw new Error("Failed to update data");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (confirmed) {
        setIsLoading(true);
        await removeTodo(id);
        window.alert("Todo deleted successfully");
        fetchTodo();
      }
    } catch (e) {
      throw new Error("Failed to delete data");
    }
  };

  return {
    isLoading,
    todos,
    handleInprogress,
    customHandleSubmit,
    handleHold,
    handleCompleted,
    handleDelete,
  };
};
