import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Logo from "assets/imgs/logo.svg";
import Arrow from "assets/icons/arrow.svg";
import MenuIcon from "assets/icons/menu.svg";
import Notifications from "assets/imgs/notifications.svg";
import { Login, ModalProfile, Menu } from "components";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "data/hooks/useWindowSize";
import useAuthContext from "data/hooks/useAuthContext";

export const Header = () => {
  const {
    user,
    refreshUser,
    isLogged,
    handleOpenModalLogin,
    showModal,
    messages,
  } = useAuthContext();
  const [modalProfile, setModalProfile] = useState(false);
  const [linkActive, setLinkActive] = useState("");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [prevMessagesCount, setPrevMessagesCount] = useState(0);
  const newUnreadMessagesCount =
    user?.messages?.filter((message) => !message.read_status).length || 0;

  const handleNotifications = () => {
    if (isLogged === true) {
      navigate("/notifications");
    } else {
      handleOpenModalLogin(true);
    }
  };

  const toggleModalProfile = () => {
    setModalProfile(!modalProfile);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const newUnreadMessagesCount =
      user?.messages?.filter((message) => !message.read_status).length || 0;

    if (newUnreadMessagesCount > prevMessagesCount) {
      refreshUser(true);
      setPrevMessagesCount(newUnreadMessagesCount);
    }
    setUnreadMessagesCount(newUnreadMessagesCount);
    refreshUser(true);
  }, [newUnreadMessagesCount]);

  return (
    <>
      <main className={styles.header}>
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
                {unreadMessagesCount > 0 && (
                  <div className={styles.newNotification}></div>
                )}
              </div>
            ) : width < 801 && !isLogged ? null : (
              <div onClick={handleNotifications} className={styles.icon}>
                <img src={Notifications} alt="" />
                {unreadMessagesCount > 0 && (
                  <div className={styles.newNotification}></div>
                )}
              </div>
            )}
            {isLogged ? (
              <div
                className={`${styles.authUserItem} ${styles.linksHidden}`}
                onClick={toggleModalProfile}
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
      {modalProfile ? (
        <ModalProfile onModalChange={toggleModalProfile} />
      ) : null}
    </>
  );
};
