import styles from "./BonusModal.module.css";
import { motion } from "framer-motion";
import bonus from "data/bonus.json";
import Close from "assets/images/close.svg";
import Coins from "assets/images/credits.svg";

interface BonusProps {
  onModalChange: (isOpen: boolean) => void;
}

export const BonusModal = ({ onModalChange }: BonusProps) => {
  const newBonus = bonus.filter((bonus) => bonus.new || !bonus.seen);
  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: -900 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className={styles.close}>
          <img src={Close} alt="X" onClick={(e) => onModalChange(false)} />
        </div>
        <div className={styles.introduction}>
          <div className={styles.title}>Trilha de Sucessos</div>
        </div>
        <div className={styles.dataBonus}>
          {newBonus.map((bonus, index) => (
            <div className={styles.cardBonus} key={index}>
              <div className={styles.titleBonus}>{bonus?.title}</div>
              <div className={styles.content}>{bonus?.content}</div>
              <div className={styles.section}>
                <div className={styles.xp}>
                  <span className={styles.icon}>XP</span>
                  <div className={styles.numberXp}>{bonus?.xp}.00</div>
                </div>
                <div className={styles.cashBack}>
                  <img
                    src={Coins}
                    alt=""
                    style={{ width: "25px", height: "25px" }}
                  />
                  <div className={styles.coins}>{bonus?.cashBack},00</div>
                </div>
              </div>
              <div className={styles.Divcolect}>
                <div className={styles.colect}>Coletar</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.config}>
          <div className={styles.button}>Coletar tudo</div>
        </div>
      </motion.div>
    </main>
  );
};
