import styles from "./SummaryPayment.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import { useState } from "react";

interface StepsProps {
  typePayment: string;
  depositValue: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const SummaryPayment = ({
  typePayment,
  depositValue,
  nextStep,
  prevStep,
}: StepsProps) => {
  const { user } = useAuthContext();
  const pixKey = "000.***.***-*0";

  return (
    <div className={styles.step}>
      <div className={styles.valueSelected}>
        <div className={styles.box}>
          <div className={styles.sifrao}>R$</div>
          <div className={styles.value}>{depositValue.toFixed(2)}</div>
        </div>
      </div>
      <div className={styles.formsPayment}>
        {typePayment.length > 0 ? (
          <>
            <div className={styles.infos}>
              <div className={styles.label}>
                {typePayment === "boleto" ? "E-mail" : "chave pix cadastrada"}
              </div>
              <input
                type="text"
                className={styles.input}
                value={typePayment === "boleto" ? user?.email : ""}
              />
            </div>
            <div className={styles.btn} onClick={nextStep}>
              Continuar
            </div>
          </>
        ) : (
          <>
            <div className={styles.btn}>Continuar</div>
            <div
              className={styles.btn}
              style={{
                background: "transparent",
                border: "2.6px solid #71C638",
                textTransform: "capitalize",
              }}
            >
              Cadastrar {typePayment}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
