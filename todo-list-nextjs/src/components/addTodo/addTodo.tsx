import styles from "./addTodo.module.css";
import { LuPlusCircle } from "react-icons/lu";
import { ChangeEvent, useState } from "react";

interface AddTodoButtonProps {
  handleSubmit: (title: string, description: string, deadline: string, callback: () => void) => void;
}

function AddTodoButton({ handleSubmit } : AddTodoButtonProps): React.ReactNode {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDescriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleHideInput = () => {
    setShowInput(false);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  return (
    <div className={styles.input}>
      {showInput ? (
        <div className={styles.container}>
          <input
            className={styles.inputTitle}
            type="text"
            name="title"
            placeholder="Todo title"
            onChange={onTitleChangeHandler}
            value={title}
            required
          />
          <input
            className={styles.inputDescription}
            type="text"
            name="description"
            placeholder="Deskripsi"
            onChange={onDescriptionChangeHandler}
            value={description}
            required
          />
          <label className={styles.inputLabel}>Deadline</label>
          <input
            className={styles.inputDate}
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleDateChange}
            required
          />
          <div className={styles.containerButton}>
            <button
              className={styles.cancelButton}
              type="button"
              title="Cancel"
              onClick={handleHideInput}
            >
              Cancel
            </button>
            <button
              className={styles.submitButton}
              type="button"
              title="Submit"
              onClick={() =>
                handleSubmit(title, description, deadline, handleHideInput)
              }
            >
              Add Todo
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.button}
          title="Add Todo"
          type="button"
          onClick={handleShowInput}
        >
          <LuPlusCircle className={styles.buttonAdd} /> Add Task
        </button>
      )}
    </div>
  );
}

export default AddTodoButton;
