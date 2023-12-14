import styles from "./IntroBar.module.css";
import Arrow from "assets/icons/arrow-intro.svg";
import { Link, useNavigate } from "react-router-dom";

interface IntroProps {
  title: string;
  paragraph: string;
}

export const IntroBar = ({ title, paragraph }: IntroProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerIntro}>
        <div className={styles.left}>
          <div onClick={handleGoBack} className={styles.arrow}>
            <img src={Arrow} alt="" />
            <div style={{ color: "#fff", fontSize: "15px" }}>voltar</div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.txt}>
            <div className={styles.title}>{title}</div>
            <div className={styles.paragraph}>{paragraph}</div>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};
