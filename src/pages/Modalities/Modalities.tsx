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
  const [dataModality, setDataModality] = useState<{ game_id: string; results: { game_name: string; game_description: string; game_full_description: string; game_link: string; game_banner: string }[] } | null>(null);

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
  
    const filteredData = modalitiesGames.find((modality) => modality.game_id === game_id);
  
    /*setDataModality(filteredData);*/
  }, [query]);
  
  return (
    <div className={styles.container}>
      <div className={styles.modalities}>
        {dataModality && (
          <>
            <div className={styles.title}>{dataModality.game_id}</div>
            <div className={styles.cards}>
              {dataModality.results.map((result, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.title}>{result.game_name}</div>
                  <div className={styles.play}>
                    <div className={styles.btnPlay}>Jogar</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.moreGames}>
        <div className={styles.title}>Explore outras modalidades</div>
        <div className={styles.cards}>
          {modalitiesGames.map((modality, index) => (
            <div className={styles.card} key={index}>
              {/* Adicione as informações necessárias para exibir aqui */}
              <div className={styles.title}>{modality.game_id}</div>
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
