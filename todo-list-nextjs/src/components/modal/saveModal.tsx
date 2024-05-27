import styles from "./modal.module.css";
import { ModalStatus } from "../../models/modalTodo";

type ModalProps = ModalStatus;

const Modal: React.FC<ModalProps> = ({ show, onClose, onSave }) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.section}>
      <div id="id" className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Are you sure you want to save this task?</h2>
          </div>
          <div className={styles.modalBody}>
            <br></br>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.closeButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
