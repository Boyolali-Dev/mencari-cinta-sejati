import classNames from "classnames";
import React from "react";
import styles from "./todocard.module.css";
import { TodoCardStatus } from "../../models/todoCardStatus";
import { Todo } from "../../models/todo";

type TodoCardProps = {
  onComplete: (id: number) => void;
  onInProgress: (id: number) => void;
  onHold: (id: number) => void;
  onDelete: (id: number) => void;
} & Todo;

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  deadline,
  type,
  onComplete,
  onInProgress,
  onHold,
  onDelete,
}) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardButtonContainer}>
        {(type === TodoCardStatus.Todo ||
          type === TodoCardStatus.Completed) && (
          <button className={styles.cancelButton} onClick={() => onDelete(id)}>
            X
          </button>
        )}
      </div>
      <div className={styles.taskCardContent}>
        <h3>Activity: {title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.taskCardButtonContainer}>
        <p>Deadline: {deadline}</p>

        {type !== TodoCardStatus.Completed && (
          <button
            className={styles.taskCardButton}
            onClick={() => onComplete(id)}
          >
            Completed
          </button>
        )}

        {(type === TodoCardStatus.Todo || type === TodoCardStatus.Hold) && (
          <button
            className={classNames(
              styles.taskCardButton,
              styles.inProgressButton
            )}
            onClick={() => onInProgress(id)}
          >
            In Progress
          </button>
        )}

        {type === TodoCardStatus.InProgress && (
          <button
            className={classNames(styles.taskCardButton, styles.holdButton)}
            onClick={() => onHold(id)}
          >
            Hold
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
