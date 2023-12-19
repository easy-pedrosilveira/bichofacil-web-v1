import styles from "./ModalProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "data/hooks/useAuthContext";
import useAppContext from "data/hooks/useAppConfig";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const ModalProfile = ({ onModalChange }: ModalProps) => {
  const { handleLogout } = useAuthContext();
  const { setProfilePanels } = useAppContext();
  const navigate = useNavigate();
  
  const linkToProfile = (value: number) => {
    setProfilePanels(value);
    navigate("/profile");
    onModalChange(false);
  };

  const toggleLogout = () => {
    onModalChange(false);
    handleLogout();
  };

  return (
    <div className={styles.modal}>
      <Link
        to="/profile"
        onClick={(e) => linkToProfile(0)}
        className={styles.links}
      >
        <span className={styles.text}>Meu Perfil</span>
      </Link>
      <Link
        to="/profile"
        onClick={(e) => linkToProfile(0)}
        className={styles.links}
      >
        <span className={styles.text}>Pules</span>
      </Link>
      <Link
        to="/profile"
        onClick={(e) => linkToProfile(1)}
        className={styles.links}
      >
        <span className={styles.text}>Movimentações</span>
      </Link>
      <Link
        to="/profile"
        onClick={(e) => linkToProfile(2)}
        className={styles.links}
      >
        <span className={styles.text}>Efetuar saque</span>
      </Link>
      <Link
        to="/profile"
        // onClick={(e) => linkToProfile(0)}
        className={styles.links}
      >
        <span className={styles.text}>Carteira</span>
      </Link>
      <Link
        to="/profile"
        // onClick={(e) => linkToProfile(0)}
        className={styles.links}
      >
        <span className={styles.exit} onClick={(e) => toggleLogout()}>
          Desconectar
        </span>
      </Link>
    </div>
  );
};
