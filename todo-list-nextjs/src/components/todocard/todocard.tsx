import React from 'react';
import classNames from 'classnames'
import styles from './todocard.module.css'
import {TodoCardType}  from './enum';

interface TodoCardProps {
  id: number;
  activity: string;
  deadline: string;
  type: TodoCardType;
  onComplete: (id: number) => void;
  onInProgress: (id: number) => void;
  onHold: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, activity, deadline, type, onComplete, onInProgress, onHold, onDelete }) => { 
    return (
      <div className={styles.taskCard}>
        <div className={styles.taskCardButtonContainer}>
            {(type === TodoCardType.Todo || type === TodoCardType.Completed) && (
            <button className={styles.cancelButton} onClick={() => onDelete(id)}>X</button>
            )}
        </div>
        <div className={styles.taskCardContent}>
          <h3>Activity:</h3>
          <p>{activity}</p>
        </div>
        <div className={styles.taskCardButtonContainer}>
          <p>Deadline: {deadline}</p>
    
           {type !== TodoCardType.Completed && (
            <button className={styles.taskCardButton} onClick={() => onComplete(id)}>Completed</button>
          )}

           {(type === TodoCardType.Todo || type === TodoCardType.Hold) && (
            <button className={classNames(
              styles.taskCardButton,
              styles.inProgressButton)} onClick={() => onInProgress(id)}>In Progress</button>
          )}
          
          {type === TodoCardType.InProgress && (
            <button className={classNames(
              styles.taskCardButton,
              styles.holdButton
            )} onClick={() => onHold(id)}>Hold</button>
          )}
        </div>
      </div>
    );
  };
  
  export default TodoCard;