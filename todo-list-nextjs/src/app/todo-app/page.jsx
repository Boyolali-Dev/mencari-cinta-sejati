"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import TodoCard from "../../components/todocard/todocard";
import { TodoCardType } from "../../components/todocard/enum";
import AddTodoButton from "../../components/addTodo/addTodo";

function Dashboard() {
  const { id } = useParams();
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`http://localhost:3000/api`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodo();
  }, [id]);

  const handleInprogress = async (id) => {
    try {
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
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
      setTodos(updatedTodo.todos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleSubmit = (title, description, deadline, onSuccess) => {
    const newTodo = {
      title: title,
      description: description,
      deadline: deadline,
      completed: false,
      status: "new",
    };
    fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTodos(data.todos);
        onSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleHold = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/`, {
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
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
      setTodos(updatedTodo.todos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/`, {
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
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
      setTodos(updatedTodo.todos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {};

  return (
    <div>
      <AddTodoButton handleSubmit={handleSubmit} />
      <section className={styles.todoList}>
        <div className="container">
          <article>
            <label>Todo List</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "new"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onInProgress={handleInprogress}
                    todo={todo}
                    id={todo.id}
                    key={todo.id}
                    {...todo}
                    type={TodoCardType.Todo}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>In Progress</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) =>
                    todo.completed === false && todo.status === "inprogress"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onHold={handleHold}
                    todo={todo}
                    id={todo.id}
                    key={todo.id}
                    {...todo}
                    type={TodoCardType.InProgress}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>Complete</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) =>
                    todo.completed === true && todo.status === "completed"
                )
                .map((todo) => (
                  <TodoCard
                    todo={todo}
                    id={todo.id}
                    key={todo.id}
                    {...todo}
                    type={TodoCardType.Completed}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>Hold</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "hold"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onInProgress={handleInprogress}
                    todo={todo}
                    id={todo.id}
                    key={todo.id}
                    {...todo}
                    type={TodoCardType.Hold}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
