import { Link } from "react-router-dom";
import styles from "./ModalProfile.module.css";

export const ModalProfile = () => {
  return (
    <div className={styles.modal}>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.text}>Meu Perfil</span>
      </Link>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.text}>Pules</span>
      </Link>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.text}>Movimentações</span>
      </Link>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.text}>Efetuar saque</span>
      </Link>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.text}>Carteira</span>
      </Link>
      <Link
        to="/profile"
        // onClick={}
        className={styles.links}
      >
        <span className={styles.exit}>Desconectar</span>
      </Link>
    </div>
  );
};
