import styles from "./Profile.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Account, Withdraw, Extract, Settings, BuyCredits } from "components";
import user from "data/user.json";
import Credits from "../../assets/images/credits.svg";

export const Profile = () => {
  const profilePanes = [
    { title: "Conta", content: <Account /> },
    { title: "Saque", content: <Withdraw /> },
    { title: "Extratos", content: <Extract /> },
    { title: "Configurações", content: <Settings /> },
  ];

  const [selectedTab, setSelectedTab] = useState(profilePanes[0]);
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.introduction}>
          <div className={styles.profile}>
            <div className={styles.picture}>
              {/* <img src={Person} alt="" /> */}
            </div>
            <div className={styles.texts}>
              <div className={styles.name}>{user?.first_name} </div>
            </div>
          </div>
          <div className={styles.btn}>
            <div className={styles.credits} onClick={toggleBuyCredits}>
              <img src={Credits} alt="" />
              <span>Depositar</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.selectPanes}>
            {profilePanes.map((tab) => (
              <div
                key={tab.title}
                className={`${styles.tab} ${
                  tab === selectedTab ? styles.selected : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.title}
                {tab === selectedTab && (
                  <motion.div
                    className={styles.underline}
                    layoutId="underline"
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.panes}>
            <AnimatePresence>
              <motion.div
                key={selectedTab.title}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTab.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits} /> : null}
    </>
  );
};
