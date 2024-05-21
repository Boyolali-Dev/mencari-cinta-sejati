"use client";

import { usePage } from "./usePage";
import React from "react";
import styles from "./styles.module.css";
import TodoCard from "../../components/todocard/todocard";
import { TodoCardStatus } from "../../models/todoCardStatus";
import AddTodoButton from "../../components/addTodo/addTodoButton";
import Loader from "../../components/Loader/Loader";
export default function Dashboard() {
  const {
    handleCompleted,
    handleDelete,
    handleHold,
    handleInprogress,
    customHandleSubmit,
    todos,
    isLoading,
  } = usePage();

  return (
    <div>
      {isLoading && <Loader />}
      <AddTodoButton customHandleSubmit={customHandleSubmit} />
      <section className={styles.todoList}>
        <div className="container">
          <article>
            <label>TODO LIST</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "new"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onHold={handleHold}
                    onDelete={handleDelete}
                    onInProgress={handleInprogress}
                    key={todo.id}
                    {...todo}
                    type={TodoCardStatus.Todo}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>IN PROGRESS</label>
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
                    onDelete={handleDelete}
                    onInProgress={handleInprogress}
                    key={todo.id}
                    {...todo}
                    type={TodoCardStatus.InProgress}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>COMPLETED</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) =>
                    todo.completed === true && todo.status === "completed"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onHold={handleHold}
                    onDelete={handleDelete}
                    onInProgress={handleInprogress}
                    key={todo.id}
                    {...todo}
                    type={TodoCardStatus.Completed}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </div>
        <div className="container">
          <article>
            <label>HOLD</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "hold"
                )
                .map((todo) => (
                  <TodoCard
                    onComplete={handleCompleted}
                    onHold={handleHold}
                    onDelete={handleDelete}
                    onInProgress={handleInprogress}
                    key={todo.id}
                    {...todo}
                    type={TodoCardStatus.Hold}
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
