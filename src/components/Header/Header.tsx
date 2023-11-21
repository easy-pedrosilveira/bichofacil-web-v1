import styles from "./Header.module.css";
import { useState } from "react";
import { Login, Notifications } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Bell from "../../assets/images/bell.svg";
import Profile from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { modalLogin, setModalLogin } = useAuthContext();
  const [logado, setLogado] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const toggleNotifications = () => {
    setNotifications(!notifications);
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
            >
              <img src={Bell} alt="" />
              {notifications === true ? (
                <Notifications onModalChange={toggleNotifications} />
              ) : null}
            </div>
            <div
              className={styles.icon}
              id={styles.profile}
              // onClick={toggleNotifications}
            >
              <img src={Profile} alt="" />
              {notifications === true ? (
                <Notifications onModalChange={toggleNotifications} />
              ) : null}
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
          </div>
        )}
      </div>
      {modalLogin ? <Login onModalChange={setModalLogin} /> : null}
    </header>
  );
};
