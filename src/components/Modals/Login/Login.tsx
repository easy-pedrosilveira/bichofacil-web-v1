import styles from "./Login.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Close from "assets/icons/close.svg";
import Eye from "assets/icons/eye-password.svg";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { UserIdetification } from "components";
import { item } from "utils";

export const Login = () => {
  const {
    bodyLogin,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    loading,
    handleOpenModalLogin,
  } = useAuthContext();
  const [userIdetification, setUserIdetification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleUserIdetification = () => {
    setUserIdetification(!userIdetification);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.backDrop}
        onClick={(e) => {
          const containerElement = e.currentTarget as HTMLElement;
          const clickedElement = e.target as HTMLElement;
          if (containerElement === clickedElement) {
            handleOpenModalLogin(false);
          }
        }}
      >
        <div className={styles.modal}>
          <img
            src={Close}
            alt=""
            className={styles.close}
            onClick={(e) => handleOpenModalLogin(false)}
          />
          <div className={styles.txt}>
            <div className={styles.title}>Olá, bem vindo!</div>
            <div className={styles.paragraph}>
              Insira suas credencias para iniciar
            </div>
          </div>
          {!loading ? (
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
                <img
                  src={Eye}
                  alt=""
                  className={styles.icon}
                  onClick={toggleShowPassword}
                />
                <div
                  onClick={toggleUserIdetification}
                  className={styles.stayLogged}
                  style={{ cursor: "pointer" }}
                >
                  Esqueceu a senha?
                </div>
              </div>
              <button type="submit" className={styles.btn}>
                Entrar
              </button>
            </form>
          ) : (
            <div>
              <ThreeDots
                height="60"
                width="60"
                color="#202B9B"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
          <div className={styles.notAccount}>
            <div className={styles.paragraph}>Ainda não tem uma conta? </div>
            <Link
              to="/register"
              className={styles.register}
              onClick={(e) => handleOpenModalLogin(false)}
            >
              Cadastre-se!
            </Link>
          </div>
        </div>
      </motion.div>
      {userIdetification ? (
        <UserIdetification onModalChange={toggleUserIdetification} />
      ) : null}
    </>
  );
};
