import styles from "./AddPaymentForms.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import Arrow from "assets/icons/arrow-intro.svg";
import Close from "assets/icons/close.svg";
import { RegisterPaymetForms } from "components";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const AddPaymentForms = ({ onModalChange }: ModalProps) => {
  const [nextStep, setNextStep] = useState<boolean>(true);
  const [typePayment, setTypePayment] = useState<string>("");

  const handleTypePayment = (value: string) => {
    setNextStep(!nextStep);
    if (value === "pix") {
      setTypePayment(value);
    } else if (value === "cardCredit") {
      setTypePayment(value);
    } else {
      toast.error(`Método de pagamento inválido!`);
    }
  };

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.innerHeader}>
            <div className={styles.title}>Cadastrar forma de pagamento</div>
            <img src={Close} alt="" onClick={(e) => onModalChange(false)} />
          </div>
        </div>
        <div className={styles.btns}>
          {nextStep ? (
            <>
              <div
                className={styles.openModals}
                onClick={(e) => handleTypePayment("pix")}
              >
                <div className={styles.text}>Pix</div>
                <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
              </div>
              <div
                className={styles.openModals}
                onClick={(e) => handleTypePayment("cardCredit")}
              >
                <div className={styles.text}>Cartão de crédito</div>
                <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
              </div>
            </>
          ) : (
            <RegisterPaymetForms typePayment={typePayment} />
          )}
        </div>
      </div>
    </main>
  );
};
