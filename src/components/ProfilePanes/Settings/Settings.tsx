import { useState } from "react";
import styles from "./Settings.module.css";
import { DeleteModal } from "components";
import Exit from "../../../assets/images/exit.svg";
import useAuthContext from "data/hooks/useAuthContext";
export const Settings = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { logout } = useAuthContext();

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };


  return (
    <>
      <div className={styles.config}>
        <div className={styles.logout}>
          <div className={styles.txt}>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={Exit} alt="" />
              </div>
              <div className={styles.title}>Sair da conta</div>
            </div>
            <div className={styles.paragraph}>
              Ao sair da sua conta, você será desconectado e precisará fazer
              login novamente para acessar sua conta.
            </div>
          </div>
          <div className={styles.btns}>
            <div className={styles.btnLogout} onClick={logout}>Sair da conta</div>
          </div>
        </div>
        <div className={styles.delete}>
          <div className={styles.txt}>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={Exit} alt="" />
              </div>
              <div className={styles.title}>Desativar Conta</div>
            </div>
            <div className={styles.paragraph}>
              Desativar sua conta impedirá temporariamente o acesso, mas você
              poderá reativá-la posteriormente.
            </div>
          </div>
          <div className={styles.btns}>
            <div className={styles.desactive}>Desativar conta</div>
            <div className={styles.btnDelete} onClick={toggleDelete}>
              Excluir conta
            </div>
          </div>
        </div>
      </div>
      {deleteModal === true ? (
        <DeleteModal onModalChange={setDeleteModal} />
      ) : null}
    </>
  );
};
