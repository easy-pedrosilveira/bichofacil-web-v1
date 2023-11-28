import styles from "./PanesWithdraw.module.css";

export const DepositWithdraw = () => {
  return (
    <div className={styles.form}>
      <div className={styles.getInformation}>
        <div className={styles.info}>
          <div className={styles.label}>Selecione o banco</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite seu nome"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.infoCheckboxes}>
            <input type="checkbox" className={styles.inputCheckboxes} />
            <div className={styles.labelCheckboxes}>Poupança</div>
          </div>
          <div className={styles.infoCheckboxes}>
            <input type="checkbox" className={styles.inputCheckboxes} />
            <div className={styles.labelCheckboxes}>Corrente</div>
          </div>
        </div>
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
          <div className={styles.label}>Agência</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite sua Agência"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Conta</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite sua Conta"
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
