"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Dashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`http://localhost:3000/api`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const todosData = await res.json();
        setTodos(todosData.todo);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodo();
  }, []);

  return (
    <section className={styles.todo_list}>
      <div className="container">
        <article className={styles.card}>
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id}>
                <h3 className={styles.card_title}>{todo.title}</h3>
                <p className={styles.card_createdAt}>{todo.createdAt}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
