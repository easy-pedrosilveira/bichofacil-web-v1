import { CarouselResults } from "components";
import styles from "./Results.module.css";
import { useNavigate } from "react-router-dom";
import useAuthContext from "data/hooks/useAuthContext";

export const Results = () => {
  const { isLogged, handleOpenModalLogin } = useAuthContext();
  const navigate = useNavigate();

  const handleNotifications = () => {
    if (isLogged === true) {
      navigate("/modalities");
    } else {
      handleOpenModalLogin();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.btnPlay} onClick={(e) => handleNotifications()}>
          Jogar Agora
        </div>
      </div>
      <div className={styles.shadow}></div>
      <div className={styles.content}>
        <CarouselResults />
      </div>
    </div>
  );
};
