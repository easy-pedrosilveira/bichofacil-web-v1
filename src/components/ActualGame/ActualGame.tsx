import { motion } from "framer-motion";
import styles from "./ActualGame.module.css";
import { IModalities } from "interfaces";

interface BetProps {
  actualModalities: IModalities;
}
export const ActualGame = ({ actualModalities }: BetProps) => {
  console.log(actualModalities);

  return (
    <motion.div
      className={styles.container}
      initial={{ y: 900 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}>
    <form className={styles.formGame}>
      <div>Colocação</div>
      <div>{actualModalities?.name}</div>
      <div>Valor Apostado</div>
      <div>Data da Aposta</div>
      <div>Loteria</div>
    </form>
    </motion.div>
  );
};
