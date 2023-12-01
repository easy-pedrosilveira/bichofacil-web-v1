import styles from "./Header.module.css";
import { useState } from "react";
import Logo from "assets/imgs/logo.svg";
import Arrow from "assets/icons/arrow.svg";
import Menu from "assets/icons/menu.svg";
import Notifications from "assets/imgs/notifications.svg";
import { Login } from "components";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "data/hooks/useWindowSize";
import { dropdown, itemDropdown } from "utils";
import useAuthContext from "data/hooks/useAuthContext";

export const Header = () => {
  const { isLogged, handleOpenModalLogin, showModal } = useAuthContext();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const handleNotifications = () => {
    if (isLogged === true) {
      navigate("/notifications");
    } else {
      handleOpenModalLogin();
    }
  };

  // const {
  //   modalLogin,
  //   setModalLogin,
  //   modalRegister,
  //   setModalRegister,
  //   isLogged,
  // } = useAuthContext();
  // const { setProfilePanels } = useAppContext();

  return (
    <>
      <main className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.menu}>
            <img src={Menu} alt="" />
          </div>
          <Link to="/" className={styles.logo}>
            <img src={Logo} alt="" />
          </Link>
          <div className={styles.itemsContainer}>
            <Link
              to={isLogged ? "/modalities" : "/"}
              onClick={isLogged ? undefined : handleOpenModalLogin}
              className={`${styles.links} ${styles.linksHidden}`}
            >
              Jogar Agora
            </Link>
            <Link
              to={"/help"}
              className={`${styles.links} ${styles.linksHidden}`}
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
              <div className={`${styles.authUserItem} ${styles.linksHidden}`}>
                Meu Perfil <img src={Arrow} alt="" />
              </div>
            ) : (
              <div className={styles.btnLogin} onClick={handleOpenModalLogin}>
                Entrar
              </div>
            )}
          </div>
        </div>
      </main>
      {showModal ? <Login /> : null}
    </>
  );
};
