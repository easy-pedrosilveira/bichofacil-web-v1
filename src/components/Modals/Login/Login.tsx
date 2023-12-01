import styles from "./Login.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Close from "assets/icons/close.svg";
import Eye from "assets/icons/eye-password.svg";
import { item } from "utils";
import { useState } from "react";

export const Login = () => {
  const {
    bodyLogin,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleOpenModalLogin,
  } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          handleOpenModalLogin();
        }
      }}
    >
      <div className={styles.modal}>
        <img
          src={Close}
          alt=""
          className={styles.close}
          onClick={(e) => handleOpenModalLogin()}
        />
        <div className={styles.txt}>
          <div className={styles.title}>Olá, bem vindo!</div>
          <div className={styles.paragraph}>
            Insira suas credencias para iniciar
          </div>
        </div>
        <form onSubmit={(e) => handleLogin(e)} className={styles.form}>
          <div className={styles.info}>
            <div className={styles.label}>E-mail</div>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="Insira seu Email"
              onChange={(e) => handleEmailChange(e)}
              autoComplete="username"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.label}>Senha</div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={bodyLogin?.password}
              className={styles.input}
              placeholder="Senha"
              onChange={(e) => handlePasswordChange(e)}
            />
            <img src={Eye} alt="" className={styles.icon} onClick={toggleShowPassword}/>
            <Link to="/forget-password" className={styles.stayLogged}>
              Esqueceu a senha?
            </Link>
          </div>
          <button type="submit" className={styles.btn}>
            Entrar
          </button>
        </form>
        <div className={styles.notAccount}>
          <div className={styles.paragraph}>Ainda não tem uma conta? </div>
          <Link to="/register" className={styles.register}>
            Cadastre-se!
          </Link>
        </div>
      </div>
    </main>
  );
};
