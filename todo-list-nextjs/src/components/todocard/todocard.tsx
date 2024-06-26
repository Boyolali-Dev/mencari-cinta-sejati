import classNames from "classnames";
import React, { useState } from "react";
import styles from "./todocard.module.css";
import { TodoCardStatus } from "../../models/todoCardStatus";
import { Todo } from "../../models/todo";
import DeleteModal from "../modal/deleteModal";
import useModal from "../modal/useModal";

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
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  const { isModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div className={styles.taskCard}>
      <DeleteModal
        show={isModal}
        onClose={handleCloseModal}
        onDeleteModal={() => onDelete(id)}
      />
      <div className={styles.taskCardHeader}>
        <h3>Activity: {title}</h3>
        <button className={styles.toggleButton} onClick={toggleDetails}>
          {showDetails ? "Hide" : "Show"} Details
        </button>
          {(type === TodoCardStatus.Todo ||
            type === TodoCardStatus.Completed) && (
            <button className={styles.cancelButton} onClick={handleOpenModal}>
              X
            </button>
          )}
      </div>
      <div className={classNames(styles.taskCardContent, { [styles.show]: showDetails })}>
        <p>{description}</p>
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
    </div>
  );
};

export default TodoCard;
