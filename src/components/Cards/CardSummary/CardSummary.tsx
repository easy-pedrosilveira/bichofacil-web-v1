import styles from "./CardSummary.module.css";
import { BetInterface, finallyBetInterface } from "interfaces";
import { useEffect, useState } from "react";
import useBetContext from "data/hooks/useBetContext";
import useGameContext from "data/hooks/useGameContext";
import useAuthContext from "data/hooks/useAuthContext";

interface SummaryProps {
  bets: BetInterface[];
  onBetData: (data: finallyBetInterface) => void;
}

export const CardSummary = ({ bets, onBetData }: SummaryProps) => {
  const { longitude, latitude } = useAuthContext();
  const [nameGame, setNameGame] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState("");

  const formatLotteryName = (name: string) => {
    const formattedName = name.replace(/([a-zA-Z]+)([0-9]+)/, "$1 - $2h");
    return formattedName;
  };

  useEffect(() => {
    const date = new Date(bets[0].bet_date);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Os meses em JavaScript são base 0 (janeiro = 0)
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    setFormattedDate(formattedDate);
  }, [bets]);

  useEffect(() => {
    if (
      bets[0].modality === "DDG" ||
      bets[0].modality === "G" ||
      bets[0].modality === "P" ||
      bets[0].modality === "PPV" ||
      bets[0].modality === "TG"
    ) {
      setNameGame("Grupos");
    } else {
      setNameGame("Números");
    }
  }, [bets]);

  useEffect(() => {
    const betData: finallyBetInterface = {
      positions: bets[0].positions,
      numbers: bets[0].numbers,
      modality: bets[0].modality,
      lotteries: bets[0].lotteries,
      bet_date: bets[0].bet_date,
      bet_value: bets[0].bet_value,
      payment_type: "",
      localization: { latitude: latitude, longitude: longitude },
    };

    const jsonData: finallyBetInterface = betData;
    onBetData(jsonData);
  }, [bets, onBetData]);

  return (
    <div className={styles.container}>
      <div className={styles.summaryGame}>
        <div className={styles.columnDark}>
          <div className={styles.title}>Data da Aposta</div>
          <div className={styles.data}>{bets[0].dateNow}</div>
        </div>
        <div className={styles.column}>
          <div className={styles.title}>Modalidade</div>
          <div className={styles.data}>{bets[0].game_name}</div>
        </div>
        <div className={styles.columnDark}>
          <div className={styles.title}>Aposta</div>
          <div className={styles.data}>
            {bets[0].game_name} {" - "}
            {bets[0].positions.map((position, index) => (
              <span key={index}>
                {position}
                {index < bets[0].positions.length - 1 ? " - " : ""}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.title}>Números</div>
          <div className={styles.data}>
            {bets[0].numbers &&
              bets[0].numbers.length !== 0 &&
              bets.map((bet, index) => (
                <span key={index}>{bet.numbers.join(" - ")}</span>
              ))}
          </div>
        </div>
        <div className={styles.columnDark}>
          <div className={styles.title}>Data Loteria</div>
          <div className={styles.data}>{bets[0].dateNow}</div>
        </div>
        <div className={styles.column}>
          <div className={styles.title}>Loteria</div>
          <div className={styles.data}>
            {bets[0].lotteries.map((bet, index) => (
              <span key={index}>
                {formatLotteryName(bet)}
                {index < bets[0].lotteries.length - 1 ? " , " : " "}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.columnDark}>
          <div className={styles.title}>Total</div>
          <div className={styles.data}>R${" "}{bets[0].total_value.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
