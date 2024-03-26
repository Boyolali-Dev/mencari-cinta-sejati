import styles from './todocard.module.css'

const TodoCard = () => {
    return (
        <div className={styles.taskCard}>
            To Do
            <div className={styles.taskCardContent}>
                <p>Kegiatan: -</p>
                <p>Deadline: dd/mm/yy</p>
            </div>
        </div>
    )
}

export default TodoCard
