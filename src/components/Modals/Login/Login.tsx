import styles from "./Login.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { motion } from "framer-motion";
import { item } from "utils";

export const Login = () => {
  // const {
  //   handleEmailChange,
  //   handlePasswordChange,
  //   handleLogin,
  //   setModalLogin,
  //   setModalRegister,
  // } = useAuthContext();

  // const handleSpanClick = () => {
  //   setModalLogin(false);
  //   setModalRegister(true);
  // };

  return (
    <main className={styles.backDrop}>
      <div className={styles.modal}>Login</div>
    </main>
  );
};
