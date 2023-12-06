import styles from "./Profile.module.css";
import {
  IntroBar,
  BetHistory,
  TransactionLog,
  WithdrawalProcess,
} from "components";
import { useContext } from "react";
import AuthContext from "data/context/AuthContext";
import Edit from "assets/icons/edit.svg";
import Polygon from "assets/icons/polygon.svg";
import useAppContext from "data/hooks/useAppConfig";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { item } from "utils";
import { Link } from "react-router-dom";

const profilePanes = [
  { title: "Pules", content: <BetHistory /> },
  { title: "Movimentações", content: <TransactionLog /> },
  { title: "Efetuar Saque", content: <WithdrawalProcess /> },
];

export const Profile = () => {
  const { user, tickets, refreshUser } = useContext(AuthContext);
  const { profilePanels } = useAppContext();
  const [selectedTab, setSelectedTab] = useState(profilePanes[profilePanels]);
  const [arrowPosition, setArrowPosition] = useState({ left: 0 });

  useEffect(() => {
    setSelectedTab(profilePanes[profilePanels]);
  }, [profilePanels]);

  const handleTabClick = (tab: any, index: number) => {
    setSelectedTab(tab);
    const tabElement = document.getElementById(`tab-${tab.title}`);
    if (tabElement) {
      const left = tabElement.offsetLeft + tabElement.offsetWidth / 2;
      setArrowPosition({ left });
    }
  };

  return (
    <main className={styles.container}>
      <IntroBar title={"Meu Perfil"} paragraph={""} navigate={"/"} />
      <div className={styles.profile}>
        <div className={styles.innerProfile}>
          <div className={styles.txt}>
            <div className={styles.userName}>{user?.first_name}</div>
            <div className={styles.userEmail}>{user?.email}</div>
          </div>
          <Link to="/personal-data" className={styles.edit}>
            <div className={styles.icon}>
              <img src={Edit} alt="" />
            </div>
            <div className={styles.editTxt}>Editar Perfil</div>
          </Link>
        </div>
        <div className={styles.btn}>Efetuar depósito</div>
      </div>
      <div className={styles.profilePanels}>
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
        <motion.div
          className={styles.content}
          key={selectedTab.title}
          initial={{ x: 100, opacity: 0 }}
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
      </div>
    </main>
  );
};
