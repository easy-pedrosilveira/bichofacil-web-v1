import styles from "./ModalProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "data/hooks/useAuthContext";
import useAppContext from "data/hooks/useAppConfig";
import useBuyCreditsContext from "data/hooks/useBuyCreditsContext";
import { item } from "utils";
import { motion } from "framer-motion";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const ModalProfile = ({ onModalChange }: ModalProps) => {
  const { handleLogout } = useAuthContext();
  const { setProfilePanels } = useAppContext();
  const { openBuyCredits, handleOpenModalBuyCredits } = useBuyCreditsContext();

  const navigate = useNavigate();

  const linkToProfile = (value: number) => {
    setProfilePanels(value);
    navigate("/profile");
    onModalChange(false);
  };

  const openBuyCreditsModal = () => {
    handleOpenModalBuyCredits(true);
    onModalChange(false);  
  };

  const toggleLogout = () => {
    onModalChange(false);
    handleLogout();
  };

  return (
    <>
       <motion.div
        variants={item}
        initial="hidden"
        animate="visible" className={styles.modal}>
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
        <div
          onClick={(e) => openBuyCreditsModal()}
          className={styles.links}
        >
          <span className={styles.text}>Carteira</span>
        </div>
        <div className={styles.links}>
          <span className={styles.exit} onClick={(e) => toggleLogout()}>
            Desconectar
          </span>
        </div>
      </motion.div>
    </>
  );
};
