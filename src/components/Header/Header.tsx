import styles from "./Header.module.css";
import { useState } from "react";
import { Login, Navbar, Notifications } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Menu from "../../assets/images/menu.svg";
import Bell from "../../assets/images/bell.svg";
import Profile from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { modalLogin, setModalLogin } = useAuthContext();
  const [logado, setLogado] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleNavBar = () => {
    setNavBar(!navBar);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <header className={styles.header}>
      <div className={styles.innerHeader}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="" />
        </Link>
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
            {modalLogin === true ? (
              <Login onModalChange={setModalLogin} />
            ) : null}
          </div>
        )}
        {logado === true ? (
          <div className={styles.menu}>
            <img src={Menu} alt="" onClick={toggleNavBar} />
            {navBar === true ? (
              <nav
                className={`${styles.nav} ${
                  expanded === true ? styles.expanded : null
                }`}
              >
                CARALHo
                <div className={styles.toggle} onClick={toggleSidebar}></div>
              </nav>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
};
