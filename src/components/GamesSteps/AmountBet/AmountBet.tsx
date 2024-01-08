import styles from "./AmountBet.module.css";
import { useContext, useEffect, useState } from "react";
import { IModalities } from "interfaces";
import { toast } from "react-toastify";
import AuthContext from "data/context/AuthContext";
import { InsufficientBalance } from "components";

interface AmountBetProps {
  amount: IModalities;
  dataAmount: (data: number) => void;
}

export const AmountBet = ({ amount, dataAmount }: AmountBetProps) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const { user } = useContext(AuthContext);
  const creditsBalance = parseFloat(user?.credits_balance || "0");

  const toggleModalInsufficientBalance = () => {
    setInsufficientBalance(!insufficientBalance);
  };

  useEffect(() => {
    if (inputValue < 0) {
      toast.error("O número de créditos precisa ser maior que 0");
      setInputValue(0);
    }
    if (inputValue > amount?.max_bet_value) {
      toast.error(`Valor máximo para aposta é: ${amount?.max_bet_value}`);
      setInputValue(0);
    }
  }, [inputValue, amount?.max_bet_value]);

  const handleButtonClick = (value: number) => {
    if (value <= amount?.max_bet_value) {
      setInputValue(value);
    }

    if (value > creditsBalance) {
      toggleModalInsufficientBalance();
    } else {
      toast.error(`Valor máximo para aposta é: ${amount?.max_bet_value}`);
    }
  };

  useEffect(() => {
    dataAmount(inputValue);
  }, [inputValue, dataAmount]);

  const staticValues = [5, 20, 50, 100];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Valor Apostado</div>
        <div className={styles.valueSelect}>
          <div className={styles.rS}>R$</div>
          <input
            className={styles.input}
            type="text"
            value={inputValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            onChange={(e) => {
              const parsedValue = parseFloat(
                e.target.value.replace(",", ".").replace(/[^\d.-]/g, "")
              );
              setInputValue(isNaN(parsedValue) ? 0 : parsedValue);
            }}
          />
        </div>
        <div className={styles.chooseValues}>
          {staticValues.map((value) => (
            <div
              key={value}
              className={styles.values}
              onClick={() => handleButtonClick(value)}
            >
              <span className={styles.coin}>R$ </span>{" "}
              {value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          ))}
        </div>
        <div className={styles.underline}></div>
      </div>
      {insufficientBalance ? (
        <InsufficientBalance onModalChange={toggleModalInsufficientBalance} />
      ) : null}
    </>
  );
};
