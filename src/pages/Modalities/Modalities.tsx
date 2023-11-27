import styles from "./Modalities.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  }, [gameId, key]);

  const getUrl = (key: string) => {
    let filteredData: GamesProps[] = [];

    switch (key) {
      case "opportunity":
        setGameId("Tendência");
        break;
      case "recommendations":
        setGameId("Recomendados You2");
        break;
      case "jackpots":
        setGameId("Jackpots Diários");
        break;
      case "newgames":
        setGameId("Novos Jogos");
        break;
      default:
        break;
    }

    filteredData =
      modalitiesGames?.filter((modality) => modality?.game_id === gameId) || [];
    setDataModality(filteredData);
  };

  return (
    <>
      {dataModality.map((modality, index) => (
        <div className={styles.container} key={index}>
          <div className={styles.introduction}>
            <div className={styles.title}>{modality?.game_id}</div>
          </div>
          <div className={styles.modalities}>
            {modality?.results.map((result, index) => (
              <div className={styles.cardGame} key={index}>
                <div
                  className={styles.gameContent}
                  style={{
                    backgroundImage: `url(${result?.game_banner})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className={styles.info}>
                    <div className={styles.gameName}>{result?.game_name}</div>
                    <div className={styles.description}>
                      {result?.game_description.slice(0, 20)}...
                    </div>
                  </div>
                </div>
                <div className={styles.play}>
                  <div className={styles.btnPlay}>Jogar</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
