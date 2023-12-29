import styles from "./Deposit.module.css";
import ANotes from "assets/icons/a-notes.svg";
import TwoNotes from "assets/icons/two-notes.svg";
import ThreeNotes from "assets/icons/three-notes.svg";
import { useState } from "react";

interface StepsProps {
  nextStep: () => void;
  depositData: (value: number) => void;
}

export const Deposit = ({ nextStep, depositData }: StepsProps) => {
  const values = [5, 10, 20, 25, 50, 75, 100, 200];
  const [selectedValue, setSelectedValue] = useState(0);

  const handleValueSelection = (value: number) => {
    setSelectedValue(value);
    nextStep();
  };

  return (
    <>
      <div className={styles.step}>
        {values.map((value, index) => (
          <div
            key={value}
            className={`${styles.card} ${
              selectedValue === value ? styles.selected : ""
            }`}
            onClick={() => handleValueSelection(value)}
          >
            {index === 0 ? (
              <img src={ANotes} alt="" className={styles.money} />
            ) : index > 0 && index <= values.length - 3 ? (
              <img src={TwoNotes} alt="" className={styles.money} />
            ) : index >= values.length - 2 ? (
              <img src={ThreeNotes} alt="" className={styles.money} />
            ) : null}
            <div className={styles.values}>
              <div className={styles.cifrao}>R$</div>
              <div className={styles.value}>{value}</div>
            </div>
            <div className={styles.btnNow}>
              <div className={styles.text}>Comprar Agora</div>
              <button className={styles.btn}>R${value.toFixed(2)}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
