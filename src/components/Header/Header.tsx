import styles from "./Header.module.css";
import { useState } from "react";
import Logo from "assets/imgs/logo.svg";
import Arrow from "assets/icons/arrow.svg";
import Notifications from "assets/imgs/notifications.svg";
import { Login } from "components";
import { Link } from "react-router-dom";

export const Header = () => {
  const [logado, setLogado] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);

  const toggleModalLogin = () => {
    setModalLogin(!modalLogin);
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
          <div className={styles.menu}></div>
          <div className={styles.logo}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.itemsContainer}>
            <Link
              to={logado ? "/modalities" : "/"}
              onClick={logado ? undefined : toggleModalLogin}
              className={styles.links}
            >
              Jogar Agora
            </Link>
            <Link to={"/help"} className={styles.links}>
              Ajuda
            </Link>
            <Link
              to={logado ? "/notifications" : "/"}
              onClick={logado ? undefined : toggleModalLogin}
              className={styles.icon}
            >
              <img src={Notifications} alt="" />
            </Link>
            {logado ? (
              <div className={styles.authUserItem}>
                Meu Perfil <img src={Arrow} alt="" />
              </div>
            ) : (
              <div className={styles.btnLogin}>Entrar</div>
            )}
          </div>
        </div>
      </main>
      {modalLogin ? <Login /> : null}
    </>
  );
};
