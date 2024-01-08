import styles from "./ActualGame.module.css";
import { motion } from "framer-motion";
import { IModalities, BetInterface } from "interfaces";
import {
  PlacingGame,
  NumberMask,
  AmountBet,
  BetDateLottery,
  Timer,
} from "components";
import { useContext, useEffect, useState } from "react";
import BetContext from "data/context/BetContext";
import { useNavigate } from "react-router-dom";
import useGameContext from "data/hooks/useGameContext";
import useAuthContext from "data/hooks/useAuthContext";
import { toast } from "react-toastify";

interface BetProps {
  actualModalities: IModalities;
}
export const ActualGame = ({ actualModalities }: BetProps) => {
  const [dataPlacing, setDataPlacing] = useState<number[]>([]);
  const [dataNumbers, setDataNumbers] = useState<string[]>([]);
  const [dataGroups, setDataGroups] = useState<string[]>([]);
  const [dataArrayGroups, setDataArrayGroups] = useState<string[][]>([]);
  const [dataAmount, setDataAmount] = useState<number>(0);
  const [dataDate, setDataDate] = useState<string>("");
  const [dataLottery, setDataLottery] = useState<string[]>([]);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [gameName, setGameName] = useState<string>(actualModalities?.name);
  const [numbers, setNumbers] = useState<string[]>([]);
  const betContext = useContext(BetContext);
  const navigate = useNavigate();
  const { blockNumbers } = useGameContext();
  const { refreshUser } = useAuthContext();
  const date = new Date();
  const groupArrays = dataArrayGroups.map((item) => item.join("-"));

  const newDate = new Date(date);

  const dateFormated = newDate.toLocaleDateString("pt-BR");

  useEffect(() => {
    if (dataGroups.length !== 0) {
      setNumbers(dataGroups);
    } else if (dataNumbers.length !== 0) {
      setNumbers(dataNumbers);
    }
    if (dataArrayGroups.length !== 0) {
      setNumbers(groupArrays);
    }
  }, [dataGroups, dataNumbers, dataArrayGroups]);

  useEffect(() => {
    if (dataAmount > 0 && numbers.length && dataLottery.length) {
      setCreditAmount(numbers.length * dataLottery.length * dataAmount);
    } else if (dataAmount > 0 && dataGroups.length && dataLottery.length) {
      setCreditAmount(dataGroups.length * dataLottery.length * dataAmount);
    } else if (dataAmount > 0 && groupArrays.length && dataLottery.length) {
      setCreditAmount(groupArrays.length * dataLottery.length * dataAmount);
    }

    if (dataAmount > 0 && numbers.length) {
      setCreditAmount(numbers.length * dataAmount);
    } else if (dataAmount > 0 && dataGroups.length) {
      setCreditAmount(dataGroups.length * dataAmount);
    } else if (dataAmount > 0 && groupArrays.length) {
      setCreditAmount(groupArrays.length * dataAmount);
    }
  }, [numbers.length, dataAmount, dataLottery.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;

    if (dataPlacing.length === 0) {
      toast.error("Selecione as posições!");
      hasErrors = true;
    }

    if (dataAmount === 0) {
      toast.error("Selecione os créditos!");
      hasErrors = true;
    }

    if (dataDate?.trim() === "") {
      toast.error("Selecione a data!");
      hasErrors = true;
    }

    if (dataLottery.length === 0) {
      toast.error("Selecione as loterias!");
      hasErrors = true;
    }

    if (!hasErrors) {
      const formData: BetInterface = {
        positions: dataPlacing,
        numbers: numbers || null,
        modality: actualModalities?.short_name,
        lotteries: dataLottery,
        bet_date: dataDate,
        bet_value: dataAmount,
        dateNow: dateFormated,
        game_name: gameName,
        total_value: creditAmount,
      };

      const jsonData: BetInterface[] = [formData];
      betContext.setBets(jsonData);
      toast.success("Jogo realizado com sucesso!");
      refreshUser(true);
      navigate("/game-summary");
    }
  };

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
      <form className={styles.formGame} onSubmit={handleSubmit}>
        <PlacingGame placing={actualModalities} dataPlacing={setDataPlacing} />
        <NumberMask
          mask={actualModalities}
          block_numbers={blockNumbers}
          dataNumbers={setDataNumbers}
          dataGroups={setDataGroups}
          dataArrayGroups={setDataArrayGroups}
        />
        <AmountBet amount={actualModalities} dataAmount={setDataAmount} />
        <BetDateLottery
          dateAndLottery={actualModalities}
          dataDate={setDataDate}
          dataLottery={setDataLottery}
        />
        <Timer />
        <button type="submit" className={styles.btnFinish}>
          Finalizar Aposta
        </button>
      </form>
    </motion.div>
  );
};
