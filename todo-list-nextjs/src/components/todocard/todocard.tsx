import classNames from "classnames";
import React from "react";
import styles from "./todocard.module.css";
import { TodoCardType } from "./enum";

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  deadline: string;
  type: TodoCardType;
  onComplete: (id: number) => void;
  onInProgress: (id: number) => void;
  onHold: (id: number) => void;
  onDelete: (id: number) => void;
}

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
        {(type === TodoCardType.Todo || type === TodoCardType.Completed) && (
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

        {type !== TodoCardType.Completed && (
          <button
            className={styles.taskCardButton}
            onClick={() => onComplete(id)}
          >
            Completed
          </button>
        )}

        {(type === TodoCardType.Todo || type === TodoCardType.Hold) && (
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

        {type === TodoCardType.InProgress && (
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
