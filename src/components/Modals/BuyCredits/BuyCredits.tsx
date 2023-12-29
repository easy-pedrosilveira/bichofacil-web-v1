import styles from "./BuyCredits.module.css";
import { Deposit, MethodPayment } from "components";
import Arrow from "assets/icons/arrow-intro.svg";
import Close from "assets/icons/close-white.svg";
import { motion } from "framer-motion";
import useBuyCreditsContext from "data/hooks/useBuyCreditsContext";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}
export const BuyCredits = ({ onModalChange }: ModalProps) => {
  const { page, handleDepositData, nextStep, prevStep } =
    useBuyCreditsContext();

  const titlesSteps = [
    `Carteira`,
    `Pagamento`,
    `Pagamento Pix/Boleto/Cartao de Credito`,
    `Pagamento Pix/Boleto/Cartao de Credito`,
  ];

  const paragraphSteps = [
    `Selecione um valor para depositar`,
    `Escolha o método de pagamento`,
    `Insira seu CPF para continuar`,
  ];

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <Deposit depositData={handleDepositData} nextStep={nextStep} />;
      case 1:
        return <MethodPayment />;
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
          animate={{
            x: page === 0 ? 0 : page === 1 ? 100 : 200,
            originX: 0.5, 
          }}
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
