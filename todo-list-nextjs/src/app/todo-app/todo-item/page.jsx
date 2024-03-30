import React from "react";
import styles from "./styles.module.css";

function TodoItem({ id, title, description, createdAt, completed }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.card_title}>{title}</h3>
      <p>{description}</p>
      <p>{createdAt}</p>
      <p>{completed}</p>
    </div>
  );
}

export default TodoItem;
