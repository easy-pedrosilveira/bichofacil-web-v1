import styles from "./Header.module.css";
import { useState } from "react";
import { Login, Notifications, BuyCredits, Register } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Bell from "../../assets/images/bell.svg";
import Credits from "../../assets/images/credits.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  const { modalLogin, setModalLogin, modalRegister } = useAuthContext();
  const [logado, setLogado] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
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
            <div className={styles.balence}>+9999</div>
            <div
              className={styles.icon}
              id={styles.credits}
              onClick={toggleBuyCredits}
            >
              <img src={Credits} alt="" />
              {buyCredits === true ? (
                <BuyCredits onModalChange={toggleBuyCredits} />
              ) : null}
            </div>
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
      {modalLogin && !modalRegister? <Login /> : null}
      {modalRegister && !modalLogin ? <Register /> : null}
    </header>
  );
};
