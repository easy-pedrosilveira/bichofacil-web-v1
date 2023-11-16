import styles from "../../styles/components/Navbar.module.css";
import { useState } from "react";
import ToggleArrow from "../../assets/images/toggle-arrow.svg";
import Credits from "../../assets/images/credits.svg";
import GamesIcon from "../../assets/images/games.svg";
import GamesSelected from "../../assets/images/games-selected.svg";
import HelpIcon from "../../assets/images/help.svg";
import HelpSelected from "../../assets/images/help-selected.svg";
import ExitIcon from "../../assets/images/exit.svg";
import ExitSelected from "../../assets/images/exit.svg";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState("Games");
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleActiveIcon = (iconName: string) => {
    setActiveIcon(iconName);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  return (
    <nav
      className={`${styles.nav} ${expanded === true ? styles.expanded : null}`}
    >
      <div className={styles.toggle} onClick={toggleSidebar}>
        <img src={ToggleArrow} alt="" />
      </div>
      <div className={styles.profile}>
        <div className={styles.person}>
          <img src="" alt="foto do usuario" />
        </div>
        {expanded ? (
          <div className={styles.userInfo}>
            <div className={styles.userTag}>Apostador Nato</div>
            <div className={styles.userName}>Lucas Gabriel</div>
          </div>
        ) : null}
      </div>
      <div className={styles.divisor} />
      <div className={styles.navigation}>
        <div
          className={`${styles.credits} ${
            expanded === true ? styles.activeIcon : null
          }`}
          onClick={toggleBuyCredits}
        >
          <img className={styles.img} src={Credits} alt="Comprar Creditos" />
          {expanded ? (
            <div className={styles.textSelected}>Comprar Creditos</div>
          ) : null}
        </div>
        <Link
          to="/"
          className={`${styles.icons} ${
            expanded === true ? styles.activeIcon : null
          }`}
          onClick={() => handleActiveIcon("Games")}
        >
          <img
            className={styles.img}
            src={activeIcon === "Games" ? GamesSelected : GamesIcon}
            alt=""
          />
          {activeIcon && expanded ? (
            <div
              className={`${
                activeIcon === "Games" ? styles.textSelected : styles.text
              }`}
            >
              Games
            </div>
          ) : null}
        </Link>
        <Link
          to="/"
          className={`${styles.icons} ${expanded ? styles.activeIcon : null}`}
          onClick={() => handleActiveIcon("Help")}
        >
          <img
            className={styles.img}
            src={activeIcon === "Help" ? HelpSelected : HelpIcon}
            alt=""
          />
          {activeIcon && expanded ? (
            <div
              className={`${
                activeIcon === "Help" ? styles.textSelected : styles.text
              }`}
            >
              Ajuda
            </div>
          ) : null}
        </Link>
        <Link
          to="/"
          className={`${styles.icons} ${expanded ? styles.activeIcon : null}`}
          onClick={() => handleActiveIcon("Link2")}
        >
          <img
            className={styles.img}
            src={activeIcon === "Link2" ? HelpSelected : HelpIcon}
            alt=""
          />
          {activeIcon && expanded ? (
            <div
              className={`${
                activeIcon === "Link2" ? styles.textSelected : styles.text
              }`}
            >
              Ajuda
            </div>
          ) : null}
        </Link>
        <Link
          to="/"
          className={`${styles.icons} ${expanded ? styles.activeIcon : null}`}
          onClick={() => handleActiveIcon("Link3")}
        >
          <img
            className={styles.img}
            src={activeIcon === "Link3" ? HelpSelected : HelpIcon}
            alt=""
          />
          {activeIcon && expanded ? (
            <div
              className={`${
                activeIcon === "Link3" ? styles.textSelected : styles.text
              }`}
            >
              Ajuda
            </div>
          ) : null}
        </Link>
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.exit}>
        <div className={`${styles.icons} ${expanded ? styles.activeIcon : ""}`}>
          <img src={ExitIcon} alt="" />
          {expanded ? <div className={styles.text}>Sair</div> : null}
        </div>
      </div>
      {buyCredits === true ? <></> : null}
    </nav>
  );
};
