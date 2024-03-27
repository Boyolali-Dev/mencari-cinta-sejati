import styles from './todocard.module.css'

const TodoCard = () => {
    return (
        <div className={styles.taskCard}>
            To Do
            <div className={styles.taskCardContent}>
                <p>Kegiatan: -</p>
                <p>Deadline: dd/mm/yy</p>
            </div>
            <div className={styles.taskCardButtonContainer}>
                <a href="#" className={styles.taskCardButton}>Completed</a>
                <a href="#" className={`${styles.taskCardButton} ${styles.inProgressButton}`}>In Progress</a>
            </div>
        </div>
    )
}

export default TodoCard
