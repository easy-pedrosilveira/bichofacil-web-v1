import styles from "./WithdrawalProcess.module.css";
import Arrow from "assets/icons/arrow-intro.svg";

export const WithdrawalProcess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Realizar saque por:</div>
      <div className={styles.btns}>
        <div className={styles.openModals}>
          <div className={styles.text}>Pix</div>
          <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
        </div>
        <div className={styles.openModals}>
          <div className={styles.text}>Transferência Bancária</div>
          <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
        </div>
      </div>
    </div>
  );
};
