import { useState } from "react";
import { Login } from "components/Modals";
import useAuthContext from "data/hooks/useAuthContext";
import styles from '../../styles/components/Header.module.css';

const navigation = [
  { name: "Jogos", href: "#" },
  { name: "Contato", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Sobre nós", href: "#" },
];

export const Header = () => {
  const { modalLogin, setModalLogin } = useAuthContext();

  return (
    <>
      {modalLogin ? <Login isOpen={setModalLogin} /> : null}
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.logo}></div>
          <div className={styles.btns}>
            <button className={styles.login}>Entrar</button>
            <button className={styles.register}>Registrar</button>
          </div>
        </div>
      </header>
    </>
  );
};
