import { CarouselResults } from "components";
import styles from "./Results.module.css";

export const Results = () => {
  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.btnPlay}>Jogar Agora</div>
      </div>
      <div className={styles.shadow}></div>
      <div className={styles.content}>
        <CarouselResults />
      </div>
    </div>
  );
};
