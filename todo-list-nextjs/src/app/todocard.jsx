import styles from './todocard.module.css'

const TodoCard = () => {
    return (
        <div className={styles.taskCard}>
            <div className={styles.taskCardButtonContainer}>
               <button className={styles.cancelButton}>X</button>
            </div>
            <div className={styles.taskCardContent}>
                <p>Kegiatan: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Deadline: tanggal ditentukan</p>
            </div>
            <div className={styles.taskCardButtonContainer}>
                <a href="#" className={styles.taskCardButton}>Completed</a>
                <a href="#" className={`${styles.taskCardButton} ${styles.inProgressButton}`}>In Progress</a>
            </div>
        </div>
    )
}

export default TodoCard
