import styles from "./ExtractMessage.module.css";
import Close from "assets/icons/close.svg";
import { IExtractsUser } from "interfaces";
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
  extracts: IExtractsUser | undefined;
}

export const ExtractMessage = ({ onModalChange, extracts }: ModalProps) => {
  console.log(extracts?.description);

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
      <div className={styles.modal}>
        <img
          src={Close}
          alt="Close"
          className={styles.close}
          onClick={(e) => onModalChange(false)}
        />
        <div className={styles.innerModal}>
          <div className={styles.title}> {extracts?.title}</div>
          <div className={styles.info}>
            <div className={styles.label}>Valor:</div>
            <div className={styles.data}>
              R${extracts?.value}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.label}>Data:</div>
            <div className={styles.data}>
              <div className={styles.data}>
                {extracts?.date &&
                  format(
                    new Date(extracts.date),
                    `EEEE, d 'de' LLLL 'de' yyyy`,
                    { locale: ptBR }
                  )}
              </div>
            </div>
          </div>
          <div className={styles.description}>
            {extracts?.description.split("\n").map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.btn}>Compartilhar</div>
      </div>
    </div>
  );
};
