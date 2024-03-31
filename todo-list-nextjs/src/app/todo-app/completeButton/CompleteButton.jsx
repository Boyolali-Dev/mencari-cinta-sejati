import styles from "./styles.module.scss";

function CompleteButton() {
  return (
    <div className="button">
      <button
        type="button"
        className={styles.button__complete}
        title="Complete"
      >
        Complete
      </button>
    </div>
  );
}

export default CompleteButton;
