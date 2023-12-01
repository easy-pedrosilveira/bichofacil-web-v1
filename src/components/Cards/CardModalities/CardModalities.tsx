import { IModalities } from "interfaces";
import styles from "./CardModalities.module.css";
import { Link } from "react-router-dom";

interface CardModalitiesProps {
  modalities: IModalities[];
}

export const CardModalities = ({ modalities }: CardModalitiesProps) => {
  return (
    <>
      {modalities?.map((modalitie, index) => (
        <div className={styles.card}>
          <div className={styles.txt}>
            <div className={styles.title}>{modalitie?.name}</div>
            <div className={styles.underline}></div>
          </div>
          <div className={styles.btnDiv}>
            <Link
              className={styles.btn}
              style={{ color: "white" }}
              to={`/games-form/${modalitie.short_name}`}
            >
              JOGAR
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
