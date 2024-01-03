import styles from "./Deposit.module.css";
import ANotes from "assets/icons/a-notes.svg";
import TwoNotes from "assets/icons/two-notes.svg";
import ThreeNotes from "assets/icons/three-notes.svg";
import { useState } from "react";
import { InfoBuyCredits } from "interfaces";

interface StepsProps {
  infoBuyCredits: InfoBuyCredits | null;
  nextStep: () => void;
  depositData: (value: number) => void;
}

export const Deposit = ({
  infoBuyCredits,
  nextStep,
  depositData,
}: StepsProps) => {
  const handleValueSelection = (value: number) => {
    depositData(value);
    nextStep();
  };

  return (
    <>
      <div className={styles.step}>
        {infoBuyCredits?.values.map((value, index) => (
          <div
            key={value}
            className={styles.card}
            onClick={() => handleValueSelection(value)}
          >
            {index === 0 ? (
              <img src={ANotes} alt="" className={styles.money} />
            ) : index > 0 && index <= infoBuyCredits?.values.length - 3 ? (
              <img src={TwoNotes} alt="" className={styles.money} />
            ) : index >= infoBuyCredits?.values.length - 2 ? (
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
