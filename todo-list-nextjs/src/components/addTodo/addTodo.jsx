import styles from "./addTodo.module.css";
import { LuPlusCircle } from "react-icons/lu";
import { useState } from "react";

function AddTodoButton({ handleSubmit }) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChangeHandler = (event) => {
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

  const handleDateChange = (event) => {
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
          ></input>
          <input
            className={styles.inputDescription}
            type="text"
            name="description"
            placeholder="Deskripsi"
            onChange={onDescriptionChangeHandler}
            value={description}
            required
          ></input>
          <label className={styles.inputLabel}>Deadline</label>
          <input
            className={styles.inputDate}
            type="date"
            name="deadline"
            value={deadline}
            onChange={handleDateChange}
            required
          ></input>
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
