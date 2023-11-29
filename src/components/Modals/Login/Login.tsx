import styles from "./Login.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { motion } from "framer-motion";
import { item } from "utils";

export const Login = () => {
  const {
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    setModalLogin,
    setModalRegister,
  } = useAuthContext();

  const handleSpanClick = () => {
    setModalLogin(false);
    setModalRegister(true);
  };

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          setModalLogin(false);
        }
      }}
    >
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.modal}
      >
        <div className={styles.logoLogin} />
        <div className={styles.introduction}>Faça seu Login</div>
        <form onSubmit={(e) => handleLogin(e)} className={styles.form}>
          <div className={styles.info}>
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
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Insira sua Senha"
              autoComplete="current-password"
              required
              onChange={(e) => handlePasswordChange(e)}
              className={styles.input}
            />
          </div>
          <div className={styles.stayLogged}>Esqueceu a senha?</div>
          <button type="submit" className={styles.btn}>
            Entrar
          </button>
        </form>
        <div className={styles.register}>
          Ainda não possui uma conta?{" "}
          <span onClick={handleSpanClick}> Crie uma conta! </span>
        </div>
      </motion.div>
    </main>
  );
};
