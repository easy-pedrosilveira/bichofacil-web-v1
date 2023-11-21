import styles from "./Settings.module.css";

export const Settings = () => {
  return (
    <div className={styles.config}>
      <div className={styles.logout}>
        <div className={styles.txt}>
          <div className={styles.title}>Sair da conta</div>
          <div className={styles.paragraph}>
            Ao sair da sua conta, você será desconectado e precisará fazer login
            novamente para acessar sua conta.
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.btnLogout}>Sair da conta</div>
        </div>
      </div>
      <div className={styles.delete}>
        <div className={styles.txt}>
          <div className={styles.title}>Desativar Conta</div>
          <div className={styles.paragraph}>
            Desativar sua conta impedirá temporariamente o acesso, mas você
            poderá reativá-la posteriormente.
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.desactive}>Desativar conta</div>
          <div className={styles.btnDelete}>Excluir conta</div>
        </div>
      </div>
    </div>
  );
};
