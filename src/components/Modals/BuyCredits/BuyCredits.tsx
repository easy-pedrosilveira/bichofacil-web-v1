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
    postSubmitPayment,
    infoBuyCredits,
    page,
    depositValue,
    typePayment,
    dataPayment
  } = useBuyCreditsContext();

  const titlesSteps = [
    `Carteira`,
    `Pagamento`,
    `Pagamento ${
      typePayment === "credit_card"
        ? "Cartão de Crédito"
        : typePayment === "prize"
        ? "Premios"
        : typePayment
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
        ? `Confirme sua Chave Pix para continuar`
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
            nextStep={nextStep}
            onSubmit={postSubmitPayment}
          />
        );
      case 3:
        return typePayment === "pix" || typePayment === "boleto" ? (
          <PaymentCompletion
            typePayment={typePayment}
            depositValue={depositValue}
            dataPayment={dataPayment}
          />
        ) : typePayment === "prize" ||
          typePayment === "credit_card" ? null : null;
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
      <div
        className={styles.modal}
        style={{ alignItems: page === 3 ? "center" : "" }}
      >
        <motion.div className={styles.innerModal}>
          <div className={styles.innerIntro}>
            <div className={styles.left}>
              {page === 0 || page === 3 ? null : (
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
