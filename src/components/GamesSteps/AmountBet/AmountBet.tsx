import styles from "./AmountBet.module.css";
import { IModalities } from "interfaces";

interface AmountBetProps {
  amount: IModalities;
}

export const AmountBet = ({ amount }: AmountBetProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Valor Apostado</div>
      <div className={styles.valueSelect}>
        <div className={styles.rS}>R$</div>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.chooseValues}></div>
    </div>
  );
};
