import styles from "./Menu.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "assets/imgs/logo.svg";
import Close from "assets/icons/close-white.svg";
import Arrow from "assets/icons/arrow.svg";
import useAuthContext from "data/hooks/useAuthContext";
import useAppContext from "data/hooks/useAppConfig";

interface MenuProps {
  onMenuChange: (isOpen: boolean) => void;
}

export const Menu = ({ onMenuChange }: MenuProps) => {
  const { isLogged, user, handleOpenModalLogin, showModal } = useAuthContext();
  const { setProfilePanels } = useAppContext();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const linkToProfile = (value: number) => {
    setProfilePanels(value);
    navigate("/profile");
    onMenuChange(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={styles.nav}>
      <div className={styles.top}>
        <img src={Logo} alt="" className={styles.logo} />
        <img
          src={Close}
          alt=""
          className={styles.close}
          onClick={() => onMenuChange(false)}
        />
      </div>
      {isLogged ? (
        <div className={styles.dropdown}>
          <div className={styles.dropdownToggle} onClick={toggleDropdown}>
            <span className={styles.userName}>Olá, {user?.first_name}</span>
            <img src={Arrow} alt="" />
          </div>
          {dropdownOpen && (
            <div className={styles.dropdownContent}>
              <Link to="/profile">
                <span
                  className={styles.links}
                  onClick={(e) => onMenuChange(false)}
                >
                  Meu Perfil
                </span>
              </Link>
              <div onClick={(e) => linkToProfile(0)}>
                <span className={styles.links}>Pules</span>
              </div>
              <div onClick={(e) => linkToProfile(1)}>
                <span className={styles.links}>Movimentações</span>
              </div>
              <div onClick={(e) => linkToProfile(2)}>
                <span className={styles.links}>Efetuar saque</span>
              </div>
              <div>
                <span className={styles.links}>Carteira</span>
              </div>
              <div>
                <span className={styles.links} style={{ color: "#FF7369" }}>
                  Desconectar
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <div className={styles.anotherLinks}>
        <Link to="/">
          <span className={styles.links} onClick={() => onMenuChange(false)}>
            Resutados
          </span>
        </Link>
        <Link
          to={isLogged ? "/modalities" : "/"}
          onClick={(e) => (isLogged ? undefined : handleOpenModalLogin(true))}
        >
          <span className={styles.links} onClick={() => onMenuChange(false)}>
            Jogar Agora
          </span>
        </Link>
        <Link
          to=""
          onClick={(e) => (isLogged ? undefined : handleOpenModalLogin(true))}
        >
          <span className={styles.links} onClick={() => onMenuChange(false)}>
            Carteira
          </span>
        </Link>
        <Link to="/help">
          <span className={styles.links} onClick={() => onMenuChange(false)}>
            Ajuda
          </span>
        </Link>
      </div>
    </div>
  );
};
