import styles from "./Header.module.css";
import user from "data/user.json";
import { useEffect, useState } from "react";
import { Login, Notifications, Register, Navbar, BuyCredits } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo branca 1.svg";
import Menu from "../../assets/images/menu.svg";
import Bell from "../../assets/images/bell.svg";
import Profile from "../../assets/images/profile.svg";
import Credits from "../../assets/images/credits.svg";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "data/hooks/useAppContext";

export const Header = () => {
  const {
    modalLogin,
    setModalLogin,
    modalRegister,
    setModalRegister,
    isLogged,
  } = useAuthContext();
  const { setProfilePanels } = useAppContext();
  const [notifications, setNotifications] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [buyCredits, setBuyCredits] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const navigate = useNavigate();

  const linkToProfile = (value: number) => {
    setProfilePanels(value);
    navigate("/profile");
  };

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
          {isLogged === true ? (
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
        {isLogged === true ? (
          <div className={styles.itensLogged}>
            <div className={styles.balance}>{user?.winner_balance}R$</div>
            <div className={styles.withdraw} onClick={(e) => linkToProfile(1)}>
              Saque
            </div>
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
            <div className={styles.icon} id={styles.profile}>
              <Link
                to="/profile"
                className={styles.picture}
                onClick={(e) => linkToProfile(0)}
              >
                <img src={Profile} alt="" />
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.btns}>
            <div
              onClick={() => setModalRegister(!modalRegister)}
              className={styles.login}
            >
              Registrar
            </div>
            <div
              onClick={() => setModalLogin(!modalLogin)}
              className={styles.register}
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
