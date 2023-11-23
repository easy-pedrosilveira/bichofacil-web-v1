import { apiAuth } from "providers";
import styles from "./DeleteModal.module.css";

interface DeleteModalProps {
  onModalChange: (value: boolean) => void;
}

export const DeleteModal = ({ onModalChange }: DeleteModalProps) => {
  const deleteAccount = () => {
    apiAuth
      .post("/disable", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Usuário excluído!");
        } else {
          console.error("Houve algum erro!");
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.title}>Excluir Conta</div>
        <div className={styles.paragraph}>
          Tem certeza de que deseja excluir permanentemente sua conta? Esta ação
          não pode ser desfeita.
        </div>
        <div className={styles.btns}>
          <div
            className={styles.btnCancel}
            onClick={() => onModalChange(false)}
          >
            Cancelar
          </div>
          <div className={styles.btnConfirm} onClick={deleteAccount}>
            Confirmar
          </div>
        </div>
      </div>
    </main>
  );
};
