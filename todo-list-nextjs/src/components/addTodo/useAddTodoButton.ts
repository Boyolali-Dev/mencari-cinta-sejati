import { Flavors } from "next/font/google";
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
  
  export const useAddTodoButton = (customHandleSubmit: (title: string, description: string, deadline: string, onSuccess: () => void) => void) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<TodoFormValues>({ resolver });
    const [showForm, setShowForm] = useState(false);

    const handleTitleChange = (event) => {
      setShowForm(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setShowForm(event.target.value);
    };

    const handleShowInput = () => {
      setShowForm(true);
    };
  
    const handleHideInput = () => {
      setShowForm(false);
      reset();
    };

    const onNewSubmit = async () => {
      handleSubmit(data => {
        customHandleSubmit(data.title, data.description, data.deadline, handleHideInput)
      })()
    }

    return{
        onNewSubmit,
        showForm,
        register,
        handleSubmit,
        formState: { errors },
        handleTitleChange,
        handleDescriptionChange,
        handleShowInput,
        handleHideInput,
    }
}