import styles from "./styles.module.css";

const CircleLoader = () => {
  return (
    <>
    <div className={styles.backdrop}>
    <div className={styles.dotspinner}>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
      <div className={styles.dotspinnerdot}></div>
    </div>
    </div>
    </>
  );
};

export default CircleLoader;

// uiverse.io
