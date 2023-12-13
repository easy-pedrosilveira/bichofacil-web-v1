import { useState } from "react";
import styles from "./PaymentGame.module.css";
import Close from "assets/icons/close.svg";
import { PaymentSuccessful } from "components";

export const PaymentGame = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const togglePaymentSuccessful = () => {
    setPaymentSuccessful(!paymentSuccessful);
  };
  return (
    <>
      <div
        className={styles.backDrop}
        onClick={(e) => {
          const containerElement = e.currentTarget as HTMLElement;
          const clickedElement = e.target as HTMLElement;
          if (containerElement === clickedElement) {
            //   onModalChange(false);
          }
        }}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.innerHeader}>
              <div className={styles.title}>Resumo da Aposta</div>
              <div className={styles.close}>
                <img src={Close} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.valueGame}>
              <div className={styles.valueTxt}>Valor do Pagamento</div>
              <div className={styles.value}>20,00</div>
            </div>
            <div className={styles.balance}>
              <div className={styles.valueTxt} style={{ fontWeight: "700" }}>
                Saldo em carteira
              </div>
              <div
                className={styles.valueTxt}
                style={{ fontWeight: "700", fontSize: "18px" }}
              >
                R$ 348,50
              </div>
            </div>
            <div className={styles.debited}>
              Valor debitado <span className={styles.debitedTxt}>20,00</span>
            </div>
            <div className={styles.btn} onClick={togglePaymentSuccessful}>
              Pagar
            </div>
          </div>
        </div>
      </div>
      {paymentSuccessful ? <PaymentSuccessful /> : null}
    </>
  );
};
