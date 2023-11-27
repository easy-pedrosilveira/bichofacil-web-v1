import styles from "./Header.module.css";
import user from "data/user.json";
import { useEffect, useState } from "react";
import { Login, Notifications, Register, Navbar, BuyCredits } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Menu from "../../assets/images/menu.svg";
import Bell from "../../assets/images/bell.svg";
import Profile from "../../assets/images/profile.svg";
import Credits from "../../assets/images/credits.svg";
import { Link } from "react-router-dom";


export const Header = () => {
  const { modalLogin, setModalLogin, modalRegister } = useAuthContext();
  const [logado, setLogado] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [buyCredits, setBuyCredits] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={`${styles.header} ${headerFixed ? styles.fixed : ""}`}>
      <div className={styles.innerHeader}>
        <div className={styles.topHeader}>
          <Link to="/" className={styles.logo}>
            <img src={Logo} alt="" />
          </Link>
          {logado === true ? (
            <>
              <div className={styles.menu} onClick={toggleSidebar}>
                <img src={Menu} alt="" />
              </div>
              <nav
                className={`${styles.nav} ${
                  expanded === true ? styles.expanded : null
                }`}
              >
                <Navbar onNavChange={() => toggleSidebar()} />
              </nav>
            </>
          ) : null}
        </div>
        {logado === true ? (
          <div className={styles.itensLogged}>
            <div className={styles.balence}>{user?.winner_balance}</div>
            <div
              className={styles.icon}
              id={styles.bell}
              onClick={toggleNotifications}
            >
              <img src={Bell} alt="" />
            </div>
            <div
              className={styles.icon}
              id={styles.credits}
              onClick={toggleBuyCredits}
            >
              <img src={Credits} alt="" />
            </div>
          </div>
        ) : (
          <div className={styles.btns}>
            <div
              onClick={() => setModalLogin(!modalLogin)}
              className={styles.login}
            >
              Entrar
            </div>
            {modalLogin === true ? <Login /> : null}
          </div>
        )}
      </div>
      {modalLogin && !modalRegister ? <Login /> : null}
      {modalRegister && !modalLogin ? <Register /> : null}
      {notifications ? (
        <Notifications onModalChange={toggleNotifications} />
      ) : null}
      {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits} /> : null}
    </main>
  );
};
