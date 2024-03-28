import styles from './todocard.module.css'

const TodoCard = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`

    return (
        <div className={styles.taskCard}>
            <div className={styles.taskCardButtonContainer}>
               <button className={styles.cancelButton}>X</button>
            </div>
            <div className={styles.taskCardContent}>
                <h3>Activity:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className={styles.taskCardButtonContainer}>
                <p>Deadline: {formattedDate}</p>
                <button className={styles.taskCardButton}>Completed</button>
                <button className={`${styles.taskCardButton} ${styles.inProgressButton}`}>In Progress</button >
            </div>
        </div>
    )
}

export default TodoCard
