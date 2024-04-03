import styles from './todocard.module.css'
import { TodoCardType } from './enum';

const TodoCard = ({activity, deadline, type}) => {
    return (
        <div className={styles.taskCard}>
            <div className={styles.taskCardButtonContainer}>
               <button className={styles.cancelButton}>X</button>
            </div>
            <div className={styles.taskCardContent}>
                <h3>Activity:</h3>
                <p>{activity}</p>
            </div>
            <div className={styles.taskCardButtonContainer}>
                <p>Deadline: {deadline}</p>
                {(type !== TodoCardType.Completed) && <button className={styles.taskCardButton}>Completed</button>}                
                {(type === TodoCardType.Todo || type === TodoCardType.Hold)  && <button className={`${styles.taskCardButton} ${styles.inProgressButton}`}>In Progress</button>}
                {(type === TodoCardType.InProgress)  && <button className={`${styles.taskCardButton} ${styles.holdButton}`}>Hold</button>}
            </div>
        </div>
    )
}

export default TodoCard
