import { useState } from "react";

const useModal = () => {
    const [isModal, setModal] = useState(false);
    
    const handleOpenModal = () => {
        setModal(true)
    }
    
    const handleCloseModal = () => {
        setModal(false)
    }
    
    const handleDeleteModal = () => {
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

