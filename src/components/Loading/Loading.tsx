import styles from "./Loading.module.css";
import { motion } from "framer-motion";
import TopLogo from "assets/icons/top-logo.svg";
import BottomLogo from "assets/icons/bottom-logo.svg";

export const Loading = () => {
  const topImageVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const bottomImageVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 50 } },
  };
  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <motion.div className={styles.top}>
          <motion.img
            src={TopLogo}
            alt="Top Logo"
            variants={topImageVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
        <motion.div className={styles.bottom}>
          <motion.img
            src={BottomLogo}
            alt="Bottom Logo"
            variants={bottomImageVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
      </div>
      <div className={styles.load}>carregando...</div>
    </main>
  );
};
