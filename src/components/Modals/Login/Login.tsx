import styles from "./Login.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Close from "assets/icons/close.svg";
import Eye from "assets/icons/eye-password.svg";
import { item } from "utils";

export const Login = () => {
  const { bodyLogin, handleEmailChange, handlePasswordChange, handleLogin } =
    useAuthContext();

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          handleLogin(false);
        }
      }}
    >
      <div className={styles.modal}>
        <img src={Close} alt="" className={styles.close} />
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
              type="password"
              placeholder="Insira sua Senha"
              autoComplete="current-password"
              required
              // onChange={(e) => handlePasswordChange(e)}
              className={styles.input}
            />
            <img src={Eye} alt="" className={styles.icon} />
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
