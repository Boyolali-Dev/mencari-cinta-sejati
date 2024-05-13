"use client";

import styles from "./addTodo.module.css";
import { LuPlusCircle } from "react-icons/lu";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";

type TodoFormValues = {
  title: string;
  description: string;
  deadline: string;
};

const resolver: Resolver<TodoFormValues> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.description
      ? {
          description: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.deadline
      ? {
          deadline: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export default function AddTodoButton({ customHandleSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({ resolver });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleShowInput = () => {
    setShowForm(true);
  };

  const handleHideInput = () => {
    setShowForm(false);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const handleDateChange = (event) => {
    setDeadline(event.target.value);
  };

  const onSubmit = (data) => {
    customHandleSubmit(title, description, deadline);
    console.log(data);
    handleHideInput();
  };

  return (
    <form onSubmit={customHandleSubmit || handleSubmit(onSubmit)}>
      <div className={styles.input}>
        {showForm ? (
          <div className={styles.container}>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="Todo title"
              {...register("title", { required: true })}
              onChange={handleTitleChange}
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
                onClick={() => onSubmit({ title, description, deadline })}
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
