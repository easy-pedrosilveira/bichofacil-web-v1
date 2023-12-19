import styles from "./GameSummary.module.css";
import { CardSummary, IntroBar, PaymentGame } from "components";
import useBetContext from "data/hooks/useBetContext";
import { useState } from "react";
import { finallyBetInterface } from "interfaces";


export const GameSummary = () => {
  const { bets } = useBetContext();
  const [betData, setBetData] = useState<finallyBetInterface>();
  const [paymentGame, setPaymentGame] = useState(false);

  const togglePaymentGame = () => {
    setPaymentGame(!paymentGame);
  };

  return (
    <>
      <IntroBar
        title={`Nome da Modalidade`}
        paragraph={"Resumo do Jogo"}
      />
      <div className={styles.container}>
        <CardSummary bets={bets} onBetData={setBetData}/>
        <div className={styles.divBtn}>
          <div className={styles.btn} onClick={togglePaymentGame}>
            Finalizar
          </div>
        </div>
      </div>
      {paymentGame ? <PaymentGame /> : null}
    </>
  );
};
