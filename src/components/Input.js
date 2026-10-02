import styles from "./Input.module.css";

export default function Input({ value, onChange, onClick }) {
  return (
    <div className={styles.wrapper}>
      <input
        aria-label="Message"
        className={styles.text}
        placeholder="Your prompt here..."
        value={value}
        onChange={onChange}
      />
      <button type="button" className={styles.btn} onClick={onClick} disabled={!onClick}>
        Go
      </button>
    </div>
  );
}
