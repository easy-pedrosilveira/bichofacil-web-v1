import styles from "./PanesWithdraw.module.css";

export const PixWithdraw = () => {
  return (
    <div className={styles.form}>
      <div className={styles.getInformation}>
        <div className={styles.info}>
          <div className={styles.label}>Nome</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu nome"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.label}>CPF</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu CPF"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Chave PIX</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu Chave PIX"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Valor</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite o valor desejado"
          />
        </div>
      </div>
      <div className={styles.divBtn}>
        <div
          className={styles.confirm}
          // onClick={}
        >
          Enviar
        </div>
      </div>
    </div>
  );
};
