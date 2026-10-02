import styles from "./History.module.css";

export default function History({ question, onClick }) {
  return (
    <button type="button" className={styles.wrapper} onClick={onClick} aria-label={`Show conversation: ${question}`}>
      <p>{question.substring(0, 15)}...</p>
    </button>
  );
}
