import styles from "./PaymentCompleted.module.css";
import { motion } from "framer-motion";
import Close from "assets/icons/close.svg";
import Check from "assets/icons/check-payment.svg";
import { item } from "utils";

interface StepsProps {
  depositValue: number;
}

export const PaymentCompleted = ({ depositValue }: StepsProps) => {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="visible"
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          // onModalChange(false);
        }
      }}
    >
      <div className={styles.modal}>
        <img src={Close} alt="" className={styles.close} />
        <div className={styles.intro}>
          <img src={Check} alt="" className={styles.check} />
          <div className={styles.title}>Pagamento realizado com sucesso!</div>
        </div>
        <div className={styles.info}>
          <div className={styles.paragraph}>Valor do pagamento</div>
          <div className={styles.value}>
            {depositValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className={styles.paragraph}>22/11/2022 às 10:25:25</div>
        </div>
      </div>
    </motion.div>
  );
};
