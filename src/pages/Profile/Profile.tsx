import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Account, Withdraw, Extract, Settings, BuyCredits } from "components";
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
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };
  const [selectedTab, setSelectedTab] = useState(profilePanes[profilePanels]);

  useEffect(() => {
    setSelectedTab(profilePanes[profilePanels]);
  }, [profilePanels]);

  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
  };

  return (
    <>
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
    {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits}/> : null}
</>
  );
};
