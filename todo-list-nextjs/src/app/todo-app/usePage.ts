import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchTodosDb, addTodo, updateTodo, removeTodo } from "../../lib/firebase/setting";

export const usePage = () => {
  useParams();
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  async function fetchTodo() {
    const res = await fetch(`http://localhost:3000/api/todos`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setTodos(data.todos);
    const dataFromFirebase = await fetchTodosDb()
    setTodos(Object.values(dataFromFirebase))
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      const fetchedTodosDb = await fetchTodosDb()
      setTodos(Object.values(fetchedTodosDb))
    }
    getTodos()
  }, [])

  const handleInprogress = async (id) => {
    updateTodo({
      id,
      completed: false,
      status: "inprogress",
    })
    fetchTodo()
  };

  const customHandleSubmit = async (title, description, deadline, onSuccess) => {
    addTodo({
      title, deadline, description
    })
    if ( typeof onSuccess === "function") {
      onSuccess();
    }
    fetchTodo()
  };

  const handleHold = async (id) => {
    updateTodo({
      id,
      completed: false,
      status: "hold"
    })
    fetchTodo()
  };

  const handleCompleted = async (id) => {
    updateTodo({
      id,
      completed: true,
      status: "completed"
    })
    fetchTodo()
  };

  const handleDelete = async (id) => {
    removeTodo({
      id
    })
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if(confirmed) {
      window.alert("Todo deleted successfully")
      fetchTodo()
    }
    fetchTodo()
  };

  return {
    todos,
    handleInprogress,
    customHandleSubmit,
    handleHold,
    handleCompleted,
    handleDelete,
  };
};
