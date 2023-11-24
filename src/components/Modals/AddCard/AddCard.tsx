import React, { useState } from "react";
import styles from "./AddCard.module.css";
import { RegisterCard } from "components";

interface ModalProps {
  isOpen: (value: boolean) => void;
}

export const AddCard = ({ isOpen }: ModalProps) => {
  const [nextStep, setNextStep] = useState<boolean>(true);
  const [typeCard, setTypeCard] = useState<string>("");

  const handleClick = (value: string) => {
    setNextStep(!nextStep)
    if (value === "pix") {
      setTypeCard(value);
    } else if (value === "creditCard") {
      setTypeCard(value);
    } else {
      alert("Método de pagamento inválido!");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <div>
            <span> Cadastrar forma de pagamento </span>
            <button onClick={(e) => isOpen(false)}> &#10006; </button>
          </div>
        </div>
        <div className={styles.content}>
          {nextStep ? (
            <>
              <div className={styles.input} onClick={(e) => handleClick("pix")}>
                PIX
              </div>
              <div
                className={styles.input}
                onClick={(e) => handleClick("creditCard")}
              >
                Cartão de crédito
              </div>
            </>
          ) : (
            <div>
              <RegisterCard isOpen={handleClick} typeCard={typeCard} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
