import styles from "./InsufficientBalance.module.css";
import Error from "assets/icons/error.svg";
import Close from "assets/icons/close.svg";

export const InsufficientBalance = () => {
  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <div className={styles.introduction}>
          <img src={Error} alt="" className={styles.error} />
          <div className={styles.insufficient}>Saldo Insuficiente</div>
          <div className={styles.paragraph}>
            Verifique o saldo na Carteira da sua conta, ou faça um novo
            depósito.
          </div>
        </div>
        <div className={styles.btn}>Efetuar novo Depósito</div>
      </div>
    </div>
  );
};
