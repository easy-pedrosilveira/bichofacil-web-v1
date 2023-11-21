import styles from "./Extract.module.css";
import user from "data/user.json";

export const Extract = () => {
  const extracts = user?.extracts;
  return (
    <div className={styles.container}>
      {extracts.map((extract, index) => (
        <div className={styles.extract} key={index}>
          <div className={styles.title}>
            {extract?.title}
          </div>
          <div className={styles.description}>
            {extract?.description}
          </div>
          <div className={styles.date}>
            {extract?.date}
          </div>
        </div>
      ))}
    </div>
  );
};
