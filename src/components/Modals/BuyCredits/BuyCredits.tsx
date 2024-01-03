import styles from "./BuyCredits.module.css";
import {
  Deposit,
  MethodPayment,
  PaymentCompletion,
  SummaryPayment,
} from "components";
import Arrow from "assets/icons/arrow-intro.svg";
import Close from "assets/icons/close-white.svg";
import { motion } from "framer-motion";
import useBuyCreditsContext from "data/hooks/useBuyCreditsContext";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}
export const BuyCredits = ({ onModalChange }: ModalProps) => {
  const {
    handleDepositData,
    handleMethodData,
    nextStep,
    prevStep,
    infoBuyCredits,
    page,
    depositValue,
    typePayment,
  } = useBuyCreditsContext();

  console.log(infoBuyCredits);

  const titlesSteps = [
    `Carteira`,
    `Pagamento`,
    `Pagamento ${
      typePayment || typePayment === "credit_card" ? "Cartão de Crédito" : null
    }`,
    `Pagamento ${typePayment}`,
  ];

  const paragraphSteps = [
    `Selecione um valor para depositar`,
    `Escolha o método de pagamento`,
    `${
      typePayment === "boleto"
        ? "Será enviado para o seu e-mail a comprovação dessa operação."
        : typePayment === "pix"
        ? `Insira ou confirme sua Chave Pix para continuar`
        : ``
    }`,
    ``,
  ];

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <Deposit
            infoBuyCredits={infoBuyCredits}
            depositData={handleDepositData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <MethodPayment
            infoBuyCredits={infoBuyCredits}
            methodData={handleMethodData}
            depositValue={depositValue}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SummaryPayment
            typePayment={typePayment}
            depositValue={depositValue}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <PaymentCompletion
            typePayment={typePayment}
            depositValue={depositValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
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
        <motion.div
          // animate={{
          //   x: page === 0 ? 0 : page === 1 ? 100 : 200,
          //   originX: 0.5,
          // }}
          className={styles.innerModal}
        >
          <div className={styles.innerIntro}>
            <div className={styles.left}>
              {page === 0 ? null : (
                <div className={styles.arrow}>
                  <img src={Arrow} alt="" onClick={prevStep} />
                </div>
              )}
            </div>
            <div className={styles.middle}>
              <div className={styles.txt}>
                <div className={styles.title}>{titlesSteps[page]}</div>
                <div className={styles.paragraph}>{paragraphSteps[page]}</div>
              </div>
            </div>
            <div className={styles.right}>
              {page === 0 ? (
                <div className={styles.close}>
                  <img
                    src={Close}
                    alt=""
                    onClick={(e) => onModalChange(false)}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.formSteps}>{pageDisplay()}</div>
        </motion.div>
      </div>
    </div>
  );
};
