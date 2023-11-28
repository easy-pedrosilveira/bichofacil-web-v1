import { AnimatePresence, motion } from "framer-motion";
import styles from "./Withdraw.module.css";
import { useState } from "react";
// import { PixWithdraw, DepositWithdraw } from "components";

export const Withdraw = () => {
  const [active, setActive] = useState("Pix");

  return (
    <main className={styles.container}>
      <div className={styles.introduction}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={
            active === "Pix"
              ? { backgroundColor: "#9A1AFF", color: "#fff" }
              : undefined
          }
          onClick={() => setActive("Pix")}
        >
          Pix
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={
            active === "Deposito"
              ? { backgroundColor: "#9A1AFF", color: "#fff" }
              : undefined
          }
          onClick={() => setActive("Deposito")}
        >
          Deposito
        </motion.button>
      </div>
      <div className={styles.content}>
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* {active === "Pix" ? <PixWithdraw /> : <DepositWithdraw />} */}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};
