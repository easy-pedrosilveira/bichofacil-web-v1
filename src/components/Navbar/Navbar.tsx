import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import user from "data/user.json";
import Profile from "../../assets/images/profile.svg";
import Coins from "../../assets/images/coins.svg";
import Games from "../../assets/images/games.svg";
import Config from "../../assets/images/settings.svg";
import Help from "../../assets/images/help.svg";
import Bell from "../../assets/images/bell.svg";
import Arrow from "../../assets/images/arrow.svg";

interface NavItem {
  name: string;
  path: string;
  icon: string;
  selectedIcon: string;
}

interface MenuSection {
  icon: string;
  title: string;
  items: NavItem[];
}

export const Navbar = () => {
  const [activeIcon, setActiveIcon] = useState("Jackpots");
  const [buyCredits, setBuyCredits] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>("Games");

  const menuSections: MenuSection[] = [
    {
      icon: Games,
      title: "Games",
      items: [
        {
          name: "Tendencias",
          path: "/modalities?opportunity",
          icon: Help,
          selectedIcon: Help,
        },
        {
          name: "Recomendacoes",
          path: "/modalities?recommendations",
          icon: Help,
          selectedIcon: Help,
        },
        {
          name: "Jackpots",
          path: "/modalities?jackpots",
          icon: Help,
          selectedIcon: Help,
        },
        {
          name: "Novos Jogos",
          path: "/modalities?newgames",
          icon: Help,
          selectedIcon: Help,
        },
      ],
    },
    {
      icon: Config,
      title: "Geral",
      items: [
        { name: "Ajuda", path: "", icon: Help, selectedIcon: Help },
        { name: "Sair", path: "/", icon: Bell, selectedIcon: Bell },
      ],
    },
  ];

  const handleActiveIcon = (iconName: string) => {
    setActiveIcon(iconName);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  const toggleDropdown = (sectionTitle: string) => {
    setOpenDropdown(openDropdown === sectionTitle ? null : sectionTitle);
  };

  return (
    <main className={styles.nav}>
      <div className={styles.profile}>
        <div className={styles.picture}>
          <img src={Profile} alt="" />
        </div>
        <div className={styles.txt}>
          <div className={styles.hi}>Olá</div>
          <div className={styles.userName}>{user?.first_name}</div>
        </div>
        <div className={styles.noti}>
          <img src={Bell} alt="" />
        </div>
      </div>
      <div className={styles.underline}></div>
      <div className={styles.links}>
        <div className={styles.credits}>
          <img src={Help} alt="" className={styles.iconSection} />
          <div className={styles.titleCredits}>Depositar</div>
        </div>
        {menuSections.map((section) => (
          <div key={section.title} className={styles.section}>
            <div className={styles.introSection}>
              <img
                src={section.icon}
                alt={section.title}
                className={styles.iconSection}
              />
              <div className={styles.titleSection}>{section.title}</div>
              <div className={styles.arrow}>
                <img
                  onClick={() => toggleDropdown(section.title)}
                  src={Arrow}
                  alt=""
                  style={{
                    transform:
                      openDropdown === section.title
                        ? "rotate(180deg)"
                        : "rotate(0)",
                  }}
                />
              </div>
            </div>
            {openDropdown === section.title && (
              <div className={styles.dropdown}>
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={
                      activeIcon === item.name
                        ? styles.selected
                        : styles.default
                    }
                    onClick={() => {
                      handleActiveIcon(item.name);
                      if (section.title === "Geral" && item.name === "Sair") {
                        console.log("lougth");
                      }
                    }}
                  >
                    <img
                      src={
                        activeIcon === item.name ? item.selectedIcon : item.icon
                      }
                      alt={item.name}
                      className={styles.icon}
                    />
                    <div className={styles.name}>{item.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};
