import styles from "./BuyCredits.module.css";
import { useState } from "react";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const BuyCredits = ({ onModalChange }: ModalProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const coins = [1, 5, 20, 45];

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
          <div className={styles.title}>Depósito</div>
        </div>
        <div className={styles.selectValue}>
          <div className={styles.subTitle}>Selecione o valor</div>
          <div className={styles.coins}>
            {coins.map((value, index) => (
              <div
                key={index}
                className={`${styles.coin} ${
                  selectedValue === value ? styles.selected : ""
                }`}
                onClick={() => setSelectedValue(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="valueSelected">
          {selectedValue && (
            <div className={styles.selectedValue}>
              Valor selecionado: {selectedValue}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
