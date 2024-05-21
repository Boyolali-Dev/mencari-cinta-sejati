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
            <label>Todo List</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "new"
                )
                .map((todo) => (
                  <TodoCard
                    show={false}
                    onClose={function (): void {}}
                    onSave={function (): void {}}
                    onDeleteModal={function (): void {}}
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
            <label>In Progress</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) =>
                    todo.completed === false && todo.status === "inprogress"
                )
                .map((todo) => (
                  <TodoCard
                    show={false}
                    onClose={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onSave={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onDeleteModal={function (): void {
                      throw new Error("Function not implemented.");
                    }}
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
            <label>Complete</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) =>
                    todo.completed === true && todo.status === "completed"
                )
                .map((todo) => (
                  <TodoCard
                    show={false}
                    onClose={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onSave={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onDeleteModal={function (): void {
                      throw new Error("Function not implemented.");
                    }}
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
            <label>Hold</label>
            {todos && todos.length > 0 ? (
              todos
                .filter(
                  (todo) => todo.completed === false && todo.status === "hold"
                )
                .map((todo) => (
                  <TodoCard
                    show={false}
                    onClose={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onSave={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onDeleteModal={function (): void {
                      throw new Error("Function not implemented.");
                    }}
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
