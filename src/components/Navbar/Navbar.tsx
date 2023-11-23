import styles from "./Navbar.module.css";
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

interface NavProps {
  onChangeNav: (isOpen: boolean) => void;
}

export const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState("Games");
  const [buyCredits, setBuyCredits] = useState(false);

  const handleActiveIcon = (iconName: string) => {
    setActiveIcon(iconName);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  return (
    <main className={styles.nav}>
      <div className="profile">
        
      </div>
    </main>
  );
};
