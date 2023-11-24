import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Notifications, BuyCredits } from "components";
import user from "data/user.json";
import Profile from "../../assets/images/profile.svg";
import Credits from "../../assets/images/credits.svg";
import Home from "../../assets/images/home.svg";
import HomeSelected from "../../assets/images/home-selected.svg";
import Games from "../../assets/images/games.svg";
import GamesSelected from "../../assets/images/games-selected.svg";
import Help from "../../assets/images/help.svg";
import Bell from "../../assets/images/bell.svg";
import Opportunity from "../../assets/images/opportunity.svg";
import OpportunitySelected from "../../assets/images/opportunity-selected.svg";
import Recommendations from "../../assets/images/recommendations.svg";
import RecommendationsSelected from "../../assets/images/recommendations-selected.svg";
import JackPots from "../../assets/images/jackpot.svg";
import JackPotsSelected from "../../assets/images/jackpot-selected.svg";
import Logout from "../../assets/images/logout.svg";

interface NavbarProps {
  onNavChange: (isOpen: boolean) => void;
}

export const Navbar = ({ onNavChange }: NavbarProps) => {
  const [activeIcon, setActiveIcon] = useState("Inicio");
  const [buyCredits, setBuyCredits] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const menuSections = [
    {
      name: "Inicio",
      path: "/",
      icon: Home,
      selectedIcon: HomeSelected,
    },
    {
      name: "Tendencias",
      path: "/modalities?opportunity",
      icon: Opportunity,
      selectedIcon: OpportunitySelected,
    },
    {
      name: "Recomendacoes",
      path: "/modalities?recommendations",
      icon: Recommendations,
      selectedIcon: RecommendationsSelected,
    },
    {
      name: "Jackpots",
      path: "/modalities?jackpots",
      icon: JackPots,
      selectedIcon: JackPotsSelected,
    },
    {
      name: "Novos Jogos",
      path: "/modalities?newgames",
      icon: Games,
      selectedIcon: GamesSelected,
    },
  ];

  const handleActiveIcon = (iconName: string) => {
    setActiveIcon(iconName);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
    onNavChange(false);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    onNavChange(false);
  };

  return (
    <>
      <main className={styles.nav}>
        <div className={styles.profile}>
          <div className={styles.picture}>
            <img src={Profile} alt="" />
          </div>
          <div className={styles.txt}>
            <div className={styles.hi}>Olá</div>
            <div className={styles.userName}>{user?.first_name}</div>
          </div>
        </div>
        <div className={styles.itemsUser}>
          <div className={styles.noti}>
            <img src={Bell} alt="bell" onClick={toggleNotifications} />
          </div>
          <Link to="/faq" className={styles.help}>
            <img src={Help} alt="help" />
          </Link>
          <div className={styles.credits} onClick={toggleBuyCredits}>
            <img src={Credits} alt="buy credits" />
          </div>
        </div>
        <div className={styles.links}>
          {menuSections.map((link, index) => (
            <Link
              to={link.path}
              className={`${styles.default} ${
                activeIcon === link.name ? styles.selected : ""
              }`}
              key={index}
              onClick={() => {
                handleActiveIcon(link.name);
                onNavChange(false);
              }}
            >
              <div className={styles.icon}>
                <img
                  src={activeIcon === link.name ? link.selectedIcon : link.icon}
                  alt=""
                />
              </div>
              <div
                className={
                  activeIcon === link.name ? styles.titleSelected : styles.title
                }
              >
                {link.name}
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.logout}>
          <div className={styles.default}>
            <div className={styles.icon}>
              <img src={Logout} alt="" />
            </div>
            <div
              className={styles.title}
              style={{ color: "#302E3F", fontWeight: "600" }}
            >
              Sair
            </div>
          </div>
        </div>
      </main>
      {notifications ? (
        <Notifications onModalChange={toggleNotifications} />
      ) : null}
      {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits} /> : null}
    </>
  );
};
