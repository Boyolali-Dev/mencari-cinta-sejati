"use client";

import styles from "./addTodo.module.css";
import { useAddTodoButton } from "./useAddTodoButton";
import { LuPlusCircle } from "react-icons/lu";
import { addTodo } from "../../lib/firebase/setting";
export default function AddTodoButton({
  customHandleSubmit,
}: {
  customHandleSubmit: (
    title: string,
    description: string,
    deadline: string,
    onSuccess: () => void
  ) => void;
}) {
  const {
    showForm,
    register,
    handleSubmit,
    formState: { errors },
    handleTitleChange,
    handleDescriptionChange,
    handleShowInput,
    handleHideInput,
    handleDateChange,
    onNewSubmit,
  } = useAddTodoButton(customHandleSubmit);

  return (
    <form>
      <div className={styles.input}>
        {showForm ? (
          <div className={styles.container}>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="Todo title"
              {...register("title", { required: true })}
              // onChange={handleTitleChange}
              required
            />
            {errors?.title && <p>{errors?.title?.message}</p>}
            <input
              className={styles.inputDescription}
              type="text"
              placeholder="Deskripsi"
              {...register("description", { required: true })}
              onChange={handleDescriptionChange}
              required
            />
            <label className={styles.inputLabel}>Deadline</label>
            <input
              className={styles.inputDate}
              type="date"
              {...register("deadline", { required: true })}
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
                onClick={onNewSubmit}
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
    </form>
  );
}
