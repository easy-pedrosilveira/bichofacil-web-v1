import React from "react";
import styles from "../RegisterCard/RegisterCard.module.css";
import InputMask from "react-input-mask";

export const AddCreditcard = () => {
  return (
    <div className={styles.creditArea}>
      <form>
        <div className={styles.handleInput}>
          <span>Número do cartão</span>
          <InputMask mask={"9999 9999 9999 9999"} required placeholder="1234 1234 1234 1234" />
        </div>
        <div className={styles.break}>
          <div className={styles.handleInput}>
            <span>Validade</span>
            <InputMask mask={"99/99"} required placeholder="mm/aa"/>
          </div>
          <div className={styles.handleInput}>
            <span>Código de segurança</span>
            <InputMask mask={"999"} required placeholder="123"/>
          </div>
        </div>
        <div className={styles.handleInput}>
          <span>Nome do titular</span>
          <input type="text" required/>
        </div>
        <div className={styles.break}>
          <div className={styles.handleInput}>
            <span>CPF</span>
            <InputMask mask={"999.999.999-99"} required placeholder="123.456.789-10"/>
          </div>
          <div className={styles.handleInput}>
            <span>Data de nascimento</span>
            <InputMask mask={"99/99/9999"} required placeholder="dd/mm/aaaa"/>
          </div>
        </div>
      </form>
      <button> Cadastrar </button>
    </div>
  );
};
