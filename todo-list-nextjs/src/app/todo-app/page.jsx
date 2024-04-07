"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import InProggressButton from "./inProgressButton/InProgressButton";
import AddTodoButton from "./addTodoButton/AddTodoButton";
import CompleteButton from "./completeButton/CompleteButton";
import HoldButton from "./holdButton/HoldButton";

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

  const handleInprogress = async (todo) => {
    try {
      const res = await fetch(`http://localhost:3000/api/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          completed: true,
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

  const handleHold = async (todo) => {
    try {
      const res = await fetch(`http://localhost:3000/api/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          completed: true,
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

  const handleCompleted = async (todo) => {
    try {
      const res = await fetch(`http://localhost:3000/api/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
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

  return (
    <div>
      <AddTodoButton handleSubmit={handleSubmit} />
      <section className={styles.todoList}>
        <div className="container">
          <article>
            <label>Todo List</label>
            {todos && todos.length > 0 ? (
              todos
                .filter((todo) => !todo.completed)
                .map((todo) => (
                  <div key={todo.id} className={styles.card}>
                    <h3 className={styles.titleCard}>{todo.title}</h3>
                    <p className={styles.statusCard}>{todo.status}</p>
                    <p className={styles.createAtCard}>{todo.deadline}</p>
                    <p className={styles.descriptionCard}>{todo.description}</p>
                    <div className={styles.buttonContainer}>
                      <InProggressButton
                        todo={todo}
                        handleInprogress={handleInprogress}
                      />
                    </div>
                  </div>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <article>
          <label>In Progress</label>
          {todos && todos.length > 0 ? (
            todos
              .filter(
                (todo) =>
                  todo.completed === true && todo.status === "inprogress"
              )
              .map((todo) => (
                <div key={todo.id} className={styles.card}>
                  <h3 className={styles.titleCard}>{todo.title}</h3>
                  <p className={styles.statusCard}>{todo.status}</p>
                  <p className={styles.createAtCard}>{todo.deadline}</p>
                  <p className={styles.descriptionCard}>{todo.description}</p>
                  <div className={styles.buttonContainer}>
                    <HoldButton todo={todo} handleHold={handleHold} />
                    <CompleteButton
                      todo={todo}
                      handleCompleted={handleCompleted}
                    />
                  </div>
                </div>
              ))
          ) : (
            <p>Loading...</p>
          )}
        </article>
        <article>
          <label>Completed</label>
          {todos && todos.length > 0 ? (
            todos
              .filter((todo) => todo.completed && todo.status === "completed")
              .map((todo) => (
                <div key={todo.id} className={styles.card}>
                  <h3 className={styles.titleCard}>{todo.title}</h3>
                  <p className={styles.statusCard}>{todo.status}</p>
                  <p className={styles.createAtCard}>{todo.deadline}</p>
                  <p className={styles.descriptionCard}>{todo.description}</p>
                </div>
              ))
          ) : (
            <p>Loading...</p>
          )}
        </article>
        <article>
          <label>In Progress</label>
          {todos && todos.length > 0 ? (
            todos
              .filter((todo) => todo.completed && todo.status === "hold")
              .map((todo) => (
                <div key={todo.id} className={styles.card}>
                  <h3 className={styles.titleCard}>{todo.title}</h3>
                  <p className={styles.statusCard}>{todo.status}</p>
                  <p className={styles.createAtCard}>{todo.deadline}</p>
                  <p className={styles.descriptionCard}>{todo.description}</p>
                  <div className={styles.buttonContainer}>
                    <InProggressButton
                      todo={todo}
                      handleInprogress={handleInprogress}
                    />
                    <CompleteButton />
                  </div>
                </div>
              ))
          ) : (
            <p>Loading...</p>
          )}
        </article>
      </section>
    </div>
  );
}

export default Dashboard;
