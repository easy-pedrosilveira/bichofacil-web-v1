import { motion } from "framer-motion";
import styles from "./Timer.module.css";
import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [totalTimeSeconds, setTotalTimeInSeconds] = useState(3 * 60);

  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;

  useEffect(() => {
    if (totalTimeSeconds > 0) {
      const timer = setTimeout(() => {
        setTotalTimeInSeconds(totalTimeSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [totalTimeSeconds]);

  useEffect(() => {
    if (totalTimeSeconds === 0) {
      window.location.reload();
    }
  }, [totalTimeSeconds]);

  return (
    <div className={styles.backDrop}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 20,
            restDelta: 0.001,
          },
        }}
      >
        <div className={styles.title}>Tempo para a Aposta:</div>
        <div className={styles.timer}>
          <div className={styles.bold}>
            {minutes.toString().padStart(2, "0")}
          </div>
          <div className={styles.bold}>:</div>
          <div className={styles.bold}>
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
