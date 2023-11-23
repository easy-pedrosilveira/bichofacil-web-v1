import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { Login, Notifications, BuyCredits, Register, Navbar } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Menu from "../../assets/images/menu.svg";
import Bell from "../../assets/images/bell.svg";
import Profile from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { modalLogin, setModalLogin, modalRegister } = useAuthContext();
  const [logado, setLogado] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
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
                <Navbar />
              </nav>
            </>
          ) : null}
        </div>
        {logado === true ? (
          <div className={styles.itensLogged}>
            <div className={styles.balence}>+9999</div>
            <div
              className={styles.icon}
              id={styles.bell}
              onClick={toggleNotifications}
            >
              <img src={Bell} alt="" />
              {notifications === true ? (
                <Notifications onModalChange={toggleNotifications} />
              ) : null}
            </div>
            <div className={styles.icon} id={styles.profile}>
              <img src={Profile} alt="" />
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
        {logado === true && (
          <div className={styles.responsiveItems}>
            <div
              className={styles.icon}
              id={styles.bell}
              onClick={toggleNotifications}
            >
              <img src={Bell} alt="" />
              {notifications === true ? (
                <Notifications onModalChange={toggleNotifications} />
              ) : null}
            </div>
            <div className={styles.balence}>+9999</div>

            <Link to="/profile" className={styles.icon} id={styles.profile}>
              <img src={Profile} alt="" />
            </Link>
          </div>
        )}
      </div>
      {modalLogin && !modalRegister ? <Login /> : null}
      {modalRegister && !modalLogin ? <Register /> : null}
    </main>
  );
};
