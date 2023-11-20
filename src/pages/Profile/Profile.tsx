import styles from "./Profile.module.css"; 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Account, Receipts } from "components"; 

export const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("account"); 

  const handleHelpClick = (tabName : any) => {
    setSelectedTab(tabName);
  };

  return (
    <div className={styles.window}>
      <nav>
        <ul>
          <li
            className={selectedTab === "account" ? "selected" : ""}
            onClick={() => handleHelpClick("account")}
          >
            Account
            {selectedTab === "account" && (
              <motion.div className={styles.underline} layoutId="underline" />
            )}
            <img
              src=">"
              alt=""
              className={styles.helpIcon}
              onClick={() => handleHelpClick("account")}
            />
          </li>
          <li
            className={selectedTab === "receipts" ? "selected" : ""}
            onClick={() => handleHelpClick("receipts")}
          >
            Receipts
            {selectedTab === "receipts" && (
              <motion.div className={styles.underline} layoutId="underline" />
            )}
            <img
              src="><>"
              alt=""
              className={styles.helpIcon}
              onClick={() => handleHelpClick("receipts")}
            />
          </li>
        </ul>
      </nav>
      <main>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab === "account" ? <Account /> : <Receipts />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
