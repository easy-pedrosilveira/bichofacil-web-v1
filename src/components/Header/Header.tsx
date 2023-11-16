import styles from "../../styles/components/Header.module.css";
import { useState } from "react";
import { Login } from "components/Modals";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";
import Bell from "../../assets/images/bell.svg";
import Credits from "../../assets/images/credits.svg";

export const Header = () => {
  const { modalLogin, setModalLogin } = useAuthContext();
  const [logado, setLogado] = useState(true);

  return (
    <header className={styles.header}>
      <div className={styles.innerHeader}>
        <div className={styles.logo}>
          <img src={Logo} alt="" />
        </div>
        {logado === true ? (
          <div className={styles.itensLogged}>
            <div className={styles.balence}>+9999</div>
            <div className={styles.balence}>+9999</div>
            <div className={styles.icon} id={styles.credits}>
              <img src={Credits} alt="" />
            </div>
            <div className={styles.icon} id={styles.bell}>
              <img src={Bell} alt="" />
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
      {modalLogin ? <Login isOpen={setModalLogin} /> : null}
    </header>
  );
};
