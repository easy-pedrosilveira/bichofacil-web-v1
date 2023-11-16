import styles from "../../styles/components/Header.module.css";
import { useState } from "react";
import { Login } from "components/Modals";
import useAuthContext from "data/hooks/useAuthContext";
import Logo from "../../assets/images/logo.svg";

export const Header = () => {
  const { modalLogin, setModalLogin } = useAuthContext();

  return (
    <header className={styles.header}>
      {modalLogin ? <Login isOpen={setModalLogin} /> : null}
      <div className={styles.innerHeader}>
        <div className={styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.btns}>
          <div className={styles.login}>Entrar</div>
        </div>
      </div>
    </header>
  );
};
