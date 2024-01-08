import styles from "./InsufficientBalance.module.css";
import Alert from "assets/icons/alert.svg";
import Close from "assets/icons/close.svg";
import useBuyCreditsContext from "data/hooks/useBuyCreditsContext";
import { motion } from "framer-motion";
import { item } from "utils";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const InsufficientBalance = ({ onModalChange }: ModalProps) => {
  const { openBuyCredits, handleOpenModalBuyCredits } = useBuyCreditsContext();

  const openBuyCreditsModal = () => {
    handleOpenModalBuyCredits(true);
    onModalChange(false);
  };
  return (
    <div
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.modal}
      >
        <img
          src={Close}
          alt=""
          className={styles.close}
          onClick={(e) => onModalChange(false)}
        />
        <div className={styles.introduction}>
          <img src={Alert} alt="" className={styles.error} />
          <div className={styles.insufficient}>Saldo Insuficiente</div>
          <div className={styles.paragraph}>
            Verifique o saldo na Carteira da sua conta, ou faça um novo
            depósito.
          </div>
        </div>
        <div className={styles.btn} onClick={(e) => openBuyCreditsModal()}>
          Efetuar novo Depósito
        </div>
      </motion.div>
    </div>
  );
};
