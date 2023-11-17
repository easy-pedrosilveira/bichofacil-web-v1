import styles from "../../styles/components/Footer.module.css";
import Logo from "../../assets/images/logo.svg";
import ToggleArrow from "../../assets/images/toggle-arrow.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSelectedLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.toTop} onClick={scrollToTop}>
        <img src={ToggleArrow} alt="" />
      </div>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.getstarted}>
          <div className={styles.age}>18+</div>
          <div className={styles.select} onClick={() => handleSelectedLanguage}>
            <div className={styles.languageOptions}>
              <div
                className={`${styles.languageOption} ${
                  selectedLanguage === "pt-BR" ? styles.selected : ""
                }`}
                onClick={() => handleSelectedLanguage("pt-BR")}
              >
                🇧🇷 Português
              </div>
              <div
                className={`${styles.languageOption} ${
                  selectedLanguage === "en-US" ? styles.selected : ""
                }`}
                onClick={() => handleSelectedLanguage("en-US")}
              >
                🇺🇸 English
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.txt}>
          This website is operated by Doublex Group Technology & Entertainment
          N.V., registered in Curaçao under the number 160170, with the address
          at Heelsumstraat 51, Willemstad, Curaçao, authorized by General
          Governor of Curaçao through Antillephone N.V. under the gaming license
          number 8048/JAZ2022-000 which operates this website.
        </div>
        <div className={styles.links}>
          <Link to="/policy-privacy" onClick={scrollToTop}>
            Policy Privacy
          </Link>
          <Link to="/terms-conditions" onClick={scrollToTop}>
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>©2023 You2.bet</div>
    </footer>
  );
};
