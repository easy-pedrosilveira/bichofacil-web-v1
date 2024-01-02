import styles from "./MethodPayment.module.css";
import Arrow from "assets/icons/arrow-intro.svg";

interface StepsProps {
  methodData: (type: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  depositValue: number;
}

export const MethodPayment = ({
  methodData,
  nextStep,
  prevStep,
  depositValue,
}: StepsProps) => {
  const typePayment = ["pix", "boleto", "cartao de credito"];

  const handleTypePayment = (type: string) => {
    methodData(type);
    // nextStep();
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
        {typePayment.map((type, index) => (
          <div
            className={styles.payments}
            key={index}
            onClick={() => handleTypePayment(type)}
          >
            <div className={styles.text}>{type}</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        ))}
      </div>
    </div>
  );
};
2