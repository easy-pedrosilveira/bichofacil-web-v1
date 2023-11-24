import styles from "./Modalities.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import modalitiesGames from "data/modalitiesGames.json";

interface GameResult {
  game_name: string;
  game_description: string;
  game_full_description: string;
  game_link: string;
  game_banner: string;
}

interface GamesProps {
  game_id: string;
  results: GameResult[];
}

export const Modalities = () => {
  const location = useLocation();
  const [gameId, setGameId] = useState("");
  const [dataModality, setDataModality] = useState<GamesProps[]>([]);
  const queryParams = new URLSearchParams(location?.search);
  const firstParam = queryParams.entries().next().value;
  const [key, value] = firstParam;

  useEffect(() => {
      getUrl(key);
  }, [gameId]);

  const getUrl = (key: string) => {
    let filteredData: GamesProps[] = [];

    switch (key) {
      case "opportunity":
        setGameId("TD");
        break;
      case "recommendations":
        setGameId("RY");
        break;
      case "jackpots":
        setGameId("JD");
        break;
      case "newgames":
        setGameId("NG");
        break;
      default:
        break;
    }

    filteredData =
      modalitiesGames?.filter((modality) => modality?.game_id === gameId) || [];
    setDataModality(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{dataModality.map((item, index) => <span key={index}>{item.}</span>)}</div>
      <div className={styles.modalities}>
        {/* {dataModality?.map((games, index) => (
          <span key={index}>{games?.results}</span>
        ))} */}
      </div>
      <div className={styles.moreGames}>
        <div className={styles.title}>Explore outras modalidades</div>
        <div className={styles.cards}>
        {dataModality.map((modality) => {
  modality?.results.map((item, index) => (
      <div className={styles.card} key={index}>
        <div className={styles.title}>{modality.game_id}</div>
        <div className={styles.play}>
          <div className={styles.btnPlay}>Jogar</div>
        </div>
      </div>
  ))
})}
        </div>
      </div>
    </div>
  );
};
