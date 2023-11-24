import styles from "../StepLandingPage.module.css";
import modalitiesGames from "data/modalitiesGames.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Aposta } from "../../../pages/Aposta";

export const NewGames = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataNG = modalitiesGames.find((modality) => modality.game_id === "NG");

  const isDesktop = viewportWidth >= 200 && viewportWidth <= 767;

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
          <Link to={`/modalities?newgames`} className={styles.button}>
            Veja tudo
          </Link>
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
                {isDesktop ? (
                    <Link to={game?.game_link}  className={styles.btnPlay}>
                    <div className={styles.btnPlay}>Jogar</div>
                   </Link>
                ) : (
                  <Link to={`aposta/${game?.game_link}`}  className={styles.btnPlay}>
                  <div className={styles.btnPlay}>Jogar</div>
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
