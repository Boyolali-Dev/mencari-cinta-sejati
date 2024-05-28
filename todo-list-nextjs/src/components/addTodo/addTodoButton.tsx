"use client";

import styles from "./addTodo.module.css";
import { useAddTodoButton } from "./useAddTodoButton";
import { LuPlusCircle } from "react-icons/lu";
import Modal from "../modal/saveModal";
import useModal from "../modal/useModal";
import React from "react";
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
    formState: { errors },
    handleDescriptionChange,
    handleShowInput,
    handleHideInput,
    onNewSubmit,
  } = useAddTodoButton(customHandleSubmit);
  const { isModal, handleOpenModal, handleCloseModal, handleSaveModal } =
    useModal();

  const saveModal = () => {
    onNewSubmit();
    handleSaveModal();
  };

  return (
    <>
      <Modal show={isModal} onClose={handleCloseModal} onSave={saveModal} />
      <div className={styles.input}>
        {showForm ? (
          <div className={styles.container}>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="Todo title"
              {...register("title", { required: true })}
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
                title="Open Modal"
                onClick={handleOpenModal}
              >
                Save
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
    </>
  );
}
