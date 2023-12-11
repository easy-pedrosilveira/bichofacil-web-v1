import styles from "./SelectProfilePanes.module.css";
import { motion } from "framer-motion";
import {
  BetHistory,
  TransactionLog,
  WithdrawalProcess,
} from "components/ProfilePanes";
import Polygon from "assets/icons/polygon.svg";
import useAppContext from "data/hooks/useAppConfig";
import { useEffect, useState } from "react";
import { useWindowSize } from "data";
import Arrow from "assets/icons/arrow-intro.svg";

const profilePanes = [
  { title: "Pules", content: <BetHistory /> },
  { title: "Movimentações", content: <TransactionLog /> },
  { title: "Efetuar Saque", content: <WithdrawalProcess /> },
];

export const SelectProfilePanes = () => {
  const { profilePanels } = useAppContext();
  const [selectedTab, setSelectedTab] = useState(
    profilePanes[profilePanels] || undefined
  );
  const [arrowPosition, setArrowPosition] = useState({ left: 0 });
  const { width } = useWindowSize();

  const handleTabClick = (tab: any, index: number) => {
    setSelectedTab(tab);
    const tabElement = document.getElementById(`tab-${tab.title}`);
    if (tabElement) {
      const left = tabElement.offsetLeft + tabElement.offsetWidth / 2;
      setArrowPosition({ left });
    }
  };

  useEffect(() => {
    const tabElement = document.getElementById(`tab-${selectedTab.title}`);
    if (tabElement) {
      const left = tabElement.offsetLeft + tabElement.offsetWidth / 2;
      setArrowPosition({ left });
    }
  }, [selectedTab]);

  const toggleClose = () => {
    setSelectedTab({ title: "", content: <></> });
  };

  useEffect(() => {
    if (width < 700) {
      toggleClose();
    } else {
      setSelectedTab(profilePanes[profilePanels]);
    }
  }, [width, profilePanels]);

  console.log(arrowPosition);

  return (
    <div className={styles.profilePanels}>
      <div className={styles.underlineReponsive}></div>
      <div className={styles.selectPanes}>
        <div className={styles.underline}></div>
        {profilePanes.map((tab, index) => (
          <div
            key={tab.title}
            id={`tab-${tab.title}`}
            className={`${styles.tab} ${
              selectedTab === tab ? styles.selectedTab : ""
            }`}
            onClick={() => handleTabClick(tab, index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {width >= 701
        ? selectedTab && (
            <motion.div
              className={styles.content}
              key={selectedTab.title}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              {selectedTab && (
                <img
                  src={Polygon}
                  alt=""
                  className={styles.arrowIndicator}
                  style={{ left: arrowPosition.left }}
                />
              )}
              {selectedTab.content}
            </motion.div>
          )
        : selectedTab &&
          (selectedTab.title != "" ? (
            <motion.div
              key={selectedTab.title}
              className={styles.contentResponsive}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <div className={styles.container}>
                <div className={styles.innerIntro}>
                  <div className={styles.left}>
                    <div
                      onClick={(e) => toggleClose()}
                      className={styles.arrow}
                    >
                      <img src={Arrow} alt="" />
                      <div style={{ color: "#fff", fontSize: "15px" }}>
                        voltar
                      </div>
                    </div>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.txt}>
                      <div className={styles.title}>{selectedTab?.title}</div>
                    </div>
                  </div>
                  <div className={styles.right}></div>
                </div>
              </div>
              {selectedTab.content}
            </motion.div>
          ) : null)}
    </div>
  );
};
