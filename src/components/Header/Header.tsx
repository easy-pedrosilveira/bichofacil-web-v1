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
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const [logado, setLogado] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleModalLogin = () => {
    setModalLogin(!modalLogin);
  };

  const handleNotifications = () => {
    if (logado === true) {
      navigate("/notifications");
    } else {
      toggleModalLogin();
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
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
              to={logado ? "/modalities" : "/"}
              onClick={logado ? undefined : toggleModalLogin}
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
            {width < 801 && logado ? (
              <div onClick={handleNotifications} className={styles.icon}>
                <img src={Notifications} alt="" />
              </div>
            ) : width < 801 && !logado ? null : (
              <div onClick={handleNotifications} className={styles.icon}>
                <img src={Notifications} alt="" />
              </div>
            )}
            {logado ? (
              <AnimatePresence>
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdown}
                  className={`${styles.authUserItem} ${styles.linksHidden}`}
                  onClick={toggleDropdown}
                >
                  Meu Perfil <img src={Arrow} alt="" />
                  {openDropdown && (
                    <div className={styles.backDrop}>
                      <motion.div {...itemDropdown}>Edit</motion.div>
                      <motion.div {...itemDropdown}>Share</motion.div>
                      <motion.div {...itemDropdown}>Delete</motion.div>
                      <motion.div {...itemDropdown}>Report</motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className={styles.btnLogin} onClick={toggleModalLogin}>
                Entrar
              </div>
            )}
          </div>
        </div>
      </main>
      {modalLogin ? <Login /> : null}
    </>
  );
};