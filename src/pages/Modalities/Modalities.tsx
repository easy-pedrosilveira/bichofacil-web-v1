import styles from "./Modalities.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import modalitiesGames from "data/modalitiesGames.json";

// interface GamesProps {
//   game_id: string;
//   results: {
//     game_name: string;
//     game_description: string;
//     game_full_description: string;
//     game_link: string;
//     game_banner: string;
//   };
// }

export const Modalities = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("type");
  const [dataModality, setDataModality] = useState();

  useEffect(() => {
    let game_id: any;

    switch (query) {
      case "opportunity":
        game_id = "TD";
        break;
      case "recommendations":
        game_id = "RY";
        break;
      case "jackpots":
        game_id = "JD";
        break;
      case "newgames":
        game_id = "NG";
        break;
      default:
        break;
    }

    const filteredData = modalitiesGames.filter(
      (modality) => modality.game_id === game_id
    );
    // setDataModality(filteredData);
    console.log("dataModality", dataModality);
    console.log("game_id:", game_id);
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.modalities}></div>
      <div className={styles.moreGames}>
        <div className={styles.title}>Explore outras modalidades</div>
        <div className={styles.cards}>
          {modalitiesGames.map((modalities, index) => (
              <div className={styles.card} key={index}>
              <div className={styles.play}>
                <div className={styles.btnPlay}>Jogar</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
