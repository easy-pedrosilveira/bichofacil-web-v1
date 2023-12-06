import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Logo from "assets/imgs/logo.svg";
import Arrow from "assets/icons/arrow.svg";
import MenuIcon from "assets/icons/menu.svg";
import Notifications from "assets/imgs/notifications.svg";
import { Login, ModalProfile, Menu } from "components";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "data/hooks/useWindowSize";
import { dropdown, itemDropdown } from "utils";
import useAuthContext from "data/hooks/useAuthContext";

export const Header = () => {
  const { isLogged, handleOpenModalLogin, showModal } = useAuthContext();
  const [modalProfile, setModalProfile] = useState(false);
  const [linkActive, setLinkActive] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const handleNotifications = () => {
    if (isLogged === true) {
      navigate("/notifications");
    } else {
      handleOpenModalLogin(true);
    }
  };

  const handleLinkActive = (linkName: string) => {
    setLinkActive(linkName);
  };

  const handleModalProfile = () => {
    setModalProfile(!modalProfile);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main className={`${styles.header} ${isHeaderFixed ? styles.fixed : ""}`}>
        <div className={styles.innerHeader}>
          <>
            <div className={styles.menu} onClick={toggleExpanded}>
              <img src={MenuIcon} alt="" />
            </div>
            <nav
              className={`${styles.nav} ${
                expanded === true ? styles.expanded : null
              }`}
            >
              <Menu onMenuChange={() => toggleExpanded()} />
            </nav>
          </>
          <Link to="/" className={styles.logo}>
            <img src={Logo} alt="" />
          </Link>
          <div className={styles.itemsContainer}>
            <Link
              to={isLogged ? "/modalities" : "/"}
              onClick={(e) =>
                isLogged ? undefined : handleOpenModalLogin(true)
              }
              className={`${styles.links} ${
                linkActive === "Play Now" ? styles.linkActive : ""
              } ${styles.linksHidden}`}
            >
              Jogar Agora
            </Link>
            <Link
              to={"/help"}
              className={`${styles.links} ${
                linkActive === "Help" ? styles.linkActive : ""
              } ${styles.linksHidden}`}
            >
              Ajuda
            </Link>
            {width < 801 && isLogged ? (
              <div onClick={handleNotifications} className={styles.icon}>
                <img src={Notifications} alt="" />
              </div>
            ) : width < 801 && !isLogged ? null : (
              <div onClick={handleNotifications} className={styles.icon}>
                <img src={Notifications} alt="" />
              </div>
            )}
            {isLogged ? (
              <div
                className={`${styles.authUserItem} ${styles.linksHidden}`}
                onClick={handleModalProfile}
              >
                Meu Perfil <img src={Arrow} alt="" />
              </div>
            ) : (
              <div
                className={styles.btnLogin}
                onClick={(e) => handleOpenModalLogin(true)}
              >
                Entrar
              </div>
            )}
          </div>
        </div>
      </main>
      {showModal ? <Login /> : null}
      {modalProfile ? <ModalProfile /> : null}
    </>
  );
};
