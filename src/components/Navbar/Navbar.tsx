import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import user from "data/user.json";
import Profile from "../../assets/images/profile.svg";
import Coins from "../../assets/images/coins.svg";
import Games from "../../assets/images/games.svg";
import Config from "../../assets/images/settings.svg";
import Bell from "../../assets/images/bell.svg";
import Icon from "../../assets/images/icon.svg";
import IconSelected from "../../assets/images/icon-selected.svg";
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
          icon: Icon,
          selectedIcon: IconSelected,
        },
        {
          name: "Recomendacoes",
          path: "/modalities?recommendations",
          icon: Icon,
          selectedIcon: IconSelected,
        },
        {
          name: "Jackpots",
          path: "/modalities?jackpots",
          icon: Icon,
          selectedIcon: IconSelected,
        },
        {
          name: "Novos Jogos",
          path: "/modalities?newgames",
          icon: Icon,
          selectedIcon: IconSelected,
        },
      ],
    },
    {
      icon: Config,
      title: "Geral",
      items: [
        { name: "Ajuda", path: "", icon: Icon, selectedIcon: IconSelected },
        { name: "Sair", path: "/", icon: Bell, selectedIcon: IconSelected },
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
          <div className={styles.iconSection}>
            <img src={Coins} alt="" />
          </div>
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
                    <div
                      className={
                        activeIcon === item.name
                          ? styles.nameSelected
                          : styles.name
                      }
                    >
                      {item.name}
                    </div>
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
