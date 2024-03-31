"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CompleteButton from "./completeButton/CompleteButton";

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
        setTodos(todosData.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodo();
  }, []);

  return (
    <section className={styles.todo_list}>
      <div className="container">
        <article>
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className={styles.card}>
                <h3 className={styles.card__title}>{todo.title}</h3>
                <p className={styles.card__createAt}>{todo.createAt}</p>
                <p className={styles.card__description}>{todo.description}</p>
                <CompleteButton />
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
