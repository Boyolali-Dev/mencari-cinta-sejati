import classNames from "classnames";
import React from "react";
import styles from "./todocard.module.css";
import { TodoCardStatus } from "../../models/todoCardStatus";
import { Todo } from "../../models/todo";
import DeleteModal from "../modal/deleteModal";
import useModal from "../modal/useModal";
import { ModalStatus } from "../../models/modalTodo";

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
  const { isModal, handleOpenModal, handleCloseModal } = useModal();
  return (
    <>
      <DeleteModal
        show={isModal}
        onClose={handleCloseModal}
        onDeleteModal={() => onDelete(id)}
        onSave={function (): void {}}
      />
      <div className={styles.taskCard}>
        <div className={styles.taskCardButtonContainer}>
          <button
            className={styles.cancelButton}
            type="button"
            title="Cancel"
            onClick={handleOpenModal}
          >
            X
          </button>
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
    </>
  );
};

export default TodoCard;
