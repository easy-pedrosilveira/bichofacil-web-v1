import styles from "../StepLandingPage.module.css";
import modalitiesGames from "data/modalitiesGames.json";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Opportunity = () => {
  const dataTD = modalitiesGames.find((modality) => modality.game_id === "Tendência");
  
  return (
    <main className={styles.containerGradient}>
      <div className={styles.introduction}>
        <div className={styles.texts}>
          <div className={styles.title}>Tendência</div>
          <div className={styles.paragraph}>
            Oportunidade ideal para gerar receitas boas e constantes. Oferecemos
            serviços profissionais e tecnologia de ponta para a conveniência de
            nossos jogadores.
          </div>
        </div>
        <div className={styles.divBtn}>
          <Link to={`/modalities?opportunity`} className={styles.button}>Veja tudo</Link>
        </div>
      </div>
      <div className={styles.content}>
      {dataTD && dataTD.results.map((game, index) => (
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
