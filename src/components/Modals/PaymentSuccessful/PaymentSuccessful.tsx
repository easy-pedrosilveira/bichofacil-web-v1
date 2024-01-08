import styles from "./PaymentSuccessful.module.css";
import { Link, useNavigate } from "react-router-dom";
import Check from "assets/icons/check-payment.svg";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
  title: string;
  route: string;
}

export const PaymentSuccessful = ({
  onModalChange,
  title,
  route,
}: ModalProps) => {
  const navigate = useNavigate();
  const toggleCloseModal = () => {
    onModalChange(false);
    navigate(route);
  };
  return (
    <div className={styles.backDrop}>
      <div className={styles.modal}>
        <div className={styles.introduction}>
          <img src={Check} alt="" className={styles.check} />
          <div className={styles.successful}>{title}</div>
          <div className={styles.paragraph}>
            Acompanhe os detalhes do seu pagamento na aba movimentações no seu
            perfil.
          </div>
        </div>
        <Link to={route} className={styles.btn} onClick={toggleCloseModal}>
          Voltar para Início
        </Link>
      </div>
    </div>
  );
};
