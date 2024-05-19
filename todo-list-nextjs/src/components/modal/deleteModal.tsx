import styles from "./modal.module.css";
import { ModalStatus } from "../../models/modalTodo";

type ModalProps = ModalStatus;

const DeleteModal: React.FC<ModalProps> = ({
  show,
  onClose,
  onDeleteModal,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.section}>
      <div id="id" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Are you sure you want to delete this task?</h2>
          </div>
          <div className={styles.modalBody}>
            <br></br>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.closeButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.deleteButton} onClick={onDeleteModal}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
