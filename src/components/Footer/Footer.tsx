import styles from "./Footer.module.css";
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
          O casino online garante a privacidade dos seus utilizadores, pelo que
          nesta secção fornecemos-lhe informações sobre como recolhemos, como
          utilizamos e como protegemos os dados pessoais recebidos dos nossos
          utilizadores. A administração dos casinos online garante que todos os
          dados pessoais do utilizador não serão transferidos para agências
          governamentais ou outras organizações. Ao respeitar a privacidade dos
          nossos utilizadores, concedemos a cada jogador o direito de recusar
          receber e-mails ou mensagens SMS.
        </div>
        <div className={styles.links}>
          <Link to="/policy-privacy" className={styles.ancora} onClick={scrollToTop}>
            Policy Privacy
          </Link>
          <Link to="/terms-conditions" className={styles.ancora} onClick={scrollToTop}>
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>©2023 You2.bet</div>
    </footer>
  );
};
