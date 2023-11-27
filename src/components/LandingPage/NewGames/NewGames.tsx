import styles from "../StepLandingPage.module.css";
import modalitiesGames from "data/modalitiesGames.json";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NewGames = () => {
  const dataNG = modalitiesGames.find((modality) => modality.game_id === "Novos Jogos");

  return (
    <main className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.texts}>
          <div className={styles.title}>Novos jogos</div>
          <div className={styles.paragraph}>
            A maioria dos jogos de azar em constante atualização.
          </div>
        </div>
        <div className={styles.divBtn}>
          <Link to={`/modalities?newgames`} className={styles.button}>Veja tudo</Link>
        </div>
      </div>
      <div className={styles.content}>
        {dataNG &&
          dataNG.results.map((game, index) => (
            <div className={styles.cardGame} key={index}>
              <div
                className={styles.gameContent}
                style={{
                  backgroundImage: `url(${game?.game_banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className={styles.info}>
                  <div className={styles.gameName}>{game?.game_name}</div>
                  <div className={styles.description}>
                    {game?.game_description.slice(0, 20)}...
                  </div>
                </div>
              </div>
              <div className={styles.play}>
                <div className={styles.btnPlay}>Jogar</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
