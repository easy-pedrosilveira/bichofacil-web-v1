import { CardModalities, IntroBar } from "components";
import styles from "./Modalities.module.css";
import useGameContext from "data/hooks/useGameContext";

export const Modalities = () => {
  const { modalities } = useGameContext();
  console.log(modalities);

  return (
    <div className={styles.container}>
      <IntroBar
        title={"Jogar Agora"}
        paragraph={"Selecione uma modalidade"}
        navigate={"/"}
      />
      <div className={styles.content}>
        {modalities ? <CardModalities modalities={modalities} /> : null}
      </div>
    </div>
  );
};
