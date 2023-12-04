import styles from "./ActualGame.module.css";
import { motion } from "framer-motion";
import { IModalities } from "interfaces";
import { PlacingGame, MaskGame, AmountBet, BetDateLottery } from "components";
import { useState } from "react";

interface BetProps {
  actualModalities: IModalities;
}
export const ActualGame = ({ actualModalities }: BetProps) => {
  const [dataPlacing, setDataPlacing] = useState<number[]>([]);
  const [dataDate, setDataDate] = useState<string>("");
  const [dataLottery, setDataLottery] = useState<string[]>([]);

  return (
    <motion.div
      className={styles.container}
      initial={{ y: 900 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <form className={styles.formGame}>
        <PlacingGame placing={actualModalities} dataPlacing={setDataPlacing} />
        <MaskGame mask={actualModalities} />
        <AmountBet amount={actualModalities} />
        <BetDateLottery
          dateAndLottery={actualModalities}
          dataDate={setDataDate}
          dataLottery={setDataLottery}
        />
        <div className={styles.btnFinish}>Finalizar Aposta</div>
      </form>
    </motion.div>
  );
};
