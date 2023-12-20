import styles from "./PaymentSuccessful.module.css";
import { Link } from "react-router-dom";
import Check from "assets/icons/check-payment.svg";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const PaymentSuccessful = ({ onModalChange }: ModalProps) => {
  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <div className={styles.introduction}>
          <img src={Check} alt="" className={styles.check} />
          <div className={styles.successful}>
            Pagamento realizado com sucesso!
          </div>
          <div className={styles.paragraph}>
            Acompanhe os detalhes do seu pagamento na aba movimentações no seu
            perfil.
          </div>
        </div>
        <Link to="/" className={styles.btn}>
          Voltar para Início
        </Link>
      </div>
    </div>
  );
};
