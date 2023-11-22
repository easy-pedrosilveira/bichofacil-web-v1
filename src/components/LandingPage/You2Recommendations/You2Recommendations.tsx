import styles from "../StepLandingPage.module.css";
import modalitiesGames from "data/modalitiesGames.json";
import { useState } from "react";
import { Link } from "react-router-dom";

export const You2Recommendations = () => {
  const dataRY = modalitiesGames.find((modality) => modality.game_id === "RY");

  return (
    <main className={styles.containerGradient}>
      <div className={styles.introduction}>
        <div className={styles.texts}>
          <div className={styles.title}>Recomendados You2</div>
          <div className={styles.paragraph}>
            Máquinas de jogos, slots de vídeo, roletas e jogos de cartas são os
            jogos mais populares nestas seções
          </div>
        </div>
        <div className={styles.divBtn}>
          <Link to={`/modalities?recommendations`} className={styles.button}>Veja tudo</Link>
        </div>
      </div>
      <div className={styles.content}>
        {dataRY &&
          dataRY.results[0].map((game, index) => (
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
                <Link to="" className={styles.btnPlay}>
                  Jogar
                </Link>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
