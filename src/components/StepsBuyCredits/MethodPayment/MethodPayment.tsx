import { InfoBuyCredits } from "interfaces";
import styles from "./MethodPayment.module.css";
import Arrow from "assets/icons/arrow-intro.svg";

interface StepsProps {
  infoBuyCredits: InfoBuyCredits | null;
  methodData: (type: string) => void;
  depositValue: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const MethodPayment = ({
  methodData,
  nextStep,
  prevStep,
  depositValue,
  infoBuyCredits,
}: StepsProps) => {
  const boletoMinAmount = parseFloat(infoBuyCredits?.boleto_min_amount || "");
  console.log(boletoMinAmount);
  const handleTypePayment = (type: string) => {
    methodData(type);
    nextStep();
  };

  return (
    <div className={styles.step}>
      <div className={styles.valueSelected}>
        <div className={styles.box}>
          <div className={styles.sifrao}>R$</div>
          <div className={styles.value}>{depositValue.toFixed(2)}</div>
        </div>
        <div className={styles.modify} onClick={prevStep}>
          Trocar Valor
        </div>
      </div>
      <div className={styles.methods}>
        {infoBuyCredits?.allow_pix ? (
          <div
            className={styles.payments}
            onClick={() => handleTypePayment("pix")}
          >
            <div className={styles.text}>Pix</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        ) : null}

        {infoBuyCredits?.allow_prize ? (
          <div
            className={styles.payments}
            onClick={() => handleTypePayment("prize")}
          >
            <div className={styles.text}>Premios</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        ) : null}

        {infoBuyCredits?.allow_codebar === true &&
        boletoMinAmount <= depositValue ? (
          <div
            className={styles.payments}
            onClick={() => handleTypePayment("boleto")}
          >
            <div className={styles.text}>Boleto</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        ) : null}

        {infoBuyCredits?.allow_credit_card ? (
          <div
            className={styles.payments}
            onClick={() => handleTypePayment("credit_card")}
          >
            <div className={styles.text}>Cartão de Crédito</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
