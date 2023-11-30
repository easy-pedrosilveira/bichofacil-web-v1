import styles from "./IntroBar.module.css";
import { Link } from "react-router-dom";
import Arrow from "assets/icons/arrow-intro.svg";

interface IntroProps {
  title: string;
  paragraph: string;
  navigate: string;
}

export const IntroBar = ({ title, paragraph, navigate }: IntroProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerIntro}>
        <Link to={navigate} className={styles.arrow}>
          <img src={Arrow} alt="" />
          <div style={{ color: "#fff", fontSize: "15px" }}>voltar</div>
        </Link>
        <div className={styles.txt}>
          <div className={styles.title}>{title}</div>
          <div className={styles.paragraph}>{paragraph}</div>
        </div>
        <div className={styles.hidden}>oi</div>
      </div>
    </div>
  );
};
