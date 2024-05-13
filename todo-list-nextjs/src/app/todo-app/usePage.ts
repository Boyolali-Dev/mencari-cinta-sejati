"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export const usePage = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch(`http://localhost:3000/api`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setTodos(data.todos);
    }
    fetchTodo();
  }, []);

  const handleInprogress = async (id) => {
    const res = await fetch(`http://localhost:3000/api/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: false,
        status: "inprogress",
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update todo");
    }
    const updatedTodo = await res.json();
    setTodos(updatedTodo.todos);
  };

  const customHandleSubmit = async (title, description, deadline, onSuccess) => {
    const newTodo = {
      title: title,
      description: description,
      deadline: deadline,
      completed: false,
      status: "new",
    };
    const res = await fetch(`http://localhost:3000/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!res.ok) {
      throw new Error("Failed to create todo");
    }
    const updateTodo = await res.json();
    setTodos(updateTodo.todos);

    if ( typeof onSuccess === "function") {
      onSuccess();
    }
  };

  const handleHold = async (id) => {
    const res = await fetch(`http://localhost:3000/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: false,
        status: "hold",
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update todo");
    }
    const updatedTodo = await res.json();
    setTodos(updatedTodo.todos);
  };

  const handleCompleted = async (id) => {
    const res = await fetch(`http://localhost:3000/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: true,
        status: "completed",
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update todo");
    }
    const updatedTodo = await res.json();
    setTodos(updatedTodo.todos);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to delete todo");
    }
    const updatedTodo = await res.json();
    setTodos(updatedTodo.todos);
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
