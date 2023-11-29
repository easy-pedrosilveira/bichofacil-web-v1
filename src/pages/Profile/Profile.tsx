import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Account, Withdraw, Extract, Settings } from "components";
import user from "data/user.json";
import Credits from "../../assets/images/credits.svg";
import useAppContext from "data/hooks/useAppContext";
import { item } from "utils";

export const Profile = () => {
  const { profilePanels } = useAppContext();

  const profilePanes = [
    { title: "Conta", content: <Account /> },
    { title: "Saque", content: <Withdraw /> },
    { title: "Extratos", content: <Extract /> },
    { title: "Configurações", content: <Settings /> },
  ];

  const [selectedTab, setSelectedTab] = useState(profilePanes[profilePanels]);

  useEffect(() => {
    setSelectedTab(profilePanes[profilePanels]);
  }, [profilePanels]);

  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
  };

  return (
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
          <div className={styles.credits}>
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
                <motion.div className={styles.underline} layoutId="underline" />
              )}
            </div>
          ))}
        </div>
        <div className={styles.panes}>
          <AnimatePresence>
            <motion.div
              key={selectedTab.title}
              variants={item}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              {selectedTab.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
