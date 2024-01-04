import styles from "./CardResults.module.css";
import { ResultGamesProps } from "interfaces";
import unidecode from "unidecode";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface cardProps {
  data: ResultGamesProps;
}

export const CardResults = ({ data }: cardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={styles.card}
    >
      <div className={styles.txts}>
        <div className={styles.innerTxts}>
          <div className={styles.title}>{data?.lottery_name}</div>
          <div className={styles.date}>
            {format(new Date(data?.lottery_date), "dd/MM/yyyy")}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {data?.result.map((result, index) => (
          <div className={styles.innerContent} key={index}>
            <div className={styles.positionNumber}>{result?.posicao}</div>
            <div className={styles.positionNumber}>{result?.numero}</div>
            <div className={styles.groupAnimal}>{result?.grupo}</div>
            <div className={styles.groupAnimal}>{result?.bicho}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
