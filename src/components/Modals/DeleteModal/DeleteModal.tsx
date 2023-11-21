import styles from "./DeleteModal.module.css";

interface DeleteModalProps {
  onModalChange: (value: boolean) => void;
}

export const DeleteModal = ({ onModalChange }: DeleteModalProps) => {
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
          Tem certeza de que deseja excluir permanentemente sua conta? Esta ação não pode ser desfeita.
        </div>
        <div className={styles.btns}>
          <div
            className={styles.btnCancel}
            onClick={() => onModalChange(false)}
          >
            Cancelar
          </div>
          <div className={styles.btnConfirm}>Confirmar</div>
        </div>
      </div>
    </main>
  );
};
