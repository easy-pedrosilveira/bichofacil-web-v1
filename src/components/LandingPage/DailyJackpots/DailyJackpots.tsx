import styles from "../StepLandingPage.module.css";
import modalitiesGames from "data/modalitiesGames.json";
import { useState } from "react";
import { Link } from "react-router-dom";

export const DailyJackpots = () => {
  const dataDJ = modalitiesGames?.find(
    (modality) => modality?.game_id === "JD"
  );

  return (
    <main className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.texts}>
          <div className={styles.title}>Jackpots diários</div>
          <div className={styles.paragraph}>
            Continuamos líderes em entretenimento online de alta qualidade,
            oferecendo ganhos diários incríveis.{" "}
          </div>
        </div>
        <div className={styles.divBtn}>
          <Link to={`/modalities?jackpots`} className={styles.button}>Veja tudo</Link>
        </div>
      </div>
      <div className={styles.content}>
        {dataDJ &&
          dataDJ.results[0].map((game, index) => (
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
