import { useState } from "react";
import { usePage } from "../../app/todo-app/usePage";

const useModal = () => {
    const [isModal, setModal] = useState(false);
    const { handleDelete } = usePage();
    
    const handleOpenModal = () => {
        setModal(true)
    }
    
    const handleCloseModal = () => {
        setModal(false)
    }
    
    const handleDeleteModal = (id) => {
        handleDelete(id);
        setModal(false)
    }

    return {
        isModal,
        handleOpenModal,
        handleCloseModal,
        handleDeleteModal
    }
}

export default useModal

