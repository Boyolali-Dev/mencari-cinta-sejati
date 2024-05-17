"use client";

import { usePage } from "./usePage";
import React from "react";
import styles from "./styles.module.css";
import TodoCard from "../../components/todocard/todocard";
import { TodoCardType } from "../../components/todocard/enum";
import AddTodoButton from "../../components/addTodo/addTodoButton";
export default function Dashboard() {
  const {
    handleCompleted,
    handleDelete,
    handleHold,
    handleInprogress,
    customHandleSubmit,
    todos,
  } = usePage();

  return (
    <div>
      <AddTodoButton customHandleSubmit={customHandleSubmit} />
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
                    onDelete={handleDelete}
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
                    onDelete={handleDelete}
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
                    onDelete={handleDelete}
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
                    onDelete={handleDelete}
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
