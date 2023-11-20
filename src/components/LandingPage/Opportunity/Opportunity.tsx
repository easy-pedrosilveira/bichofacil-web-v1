import styles from "./Opportunity.module.css";
import games from "data/games.json";
import Help from "../../../assets/images/help.svg";
import { SetStateAction, useState } from "react";

export const Opportunity = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleHelpClick = (games: any) => {
    setSelectedGame(games);
    setShowFullDescription(true);
  };

  const handleCloseDescription = () => {
    setShowFullDescription(false);
  };
  
  return (
    <main className={styles.container}>
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
          <div className={styles.button}>Veja tudo</div>
        </div>
      </div>
      <div className={styles.content}>
        {games.map((game, index) => (
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
              <img
                src={Help}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => handleHelpClick(game)}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
