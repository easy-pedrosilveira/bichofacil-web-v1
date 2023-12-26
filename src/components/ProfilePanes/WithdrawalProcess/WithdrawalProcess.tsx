import styles from "./WithdrawalProcess.module.css";
import { useState } from "react";
import Arrow from "assets/icons/arrow-intro.svg";
import { PixWithdraw, BankWithdraw, AddPaymentForms } from "components";

export const WithdrawalProcess = () => {
  const [openPixWithdraw, setOpenPixWithDraw] = useState(false);
  const [openBankWithdraw, setOpenBankWithDraw] = useState(false);
  const [openFormsPayment, setOpenFormsPayment] = useState<boolean>(false);

  const toggleOpenPixWithdraw = () => {
    setOpenPixWithDraw(!openPixWithdraw);
  };

  const toggleOpenBankWithdraw = () => {
    setOpenBankWithDraw(!openBankWithdraw);
  };

  const toggleOpenFormsPayment = () => {
    setOpenFormsPayment(!openFormsPayment);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Realizar saque por:</div>
        <div className={styles.btns}>
          <div className={styles.openModals} onClick={toggleOpenPixWithdraw}>
            <div className={styles.text}>Pix</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
          <div className={styles.openModals} onClick={toggleOpenBankWithdraw}>
            <div className={styles.text}>Transferência Bancária</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        </div>
        <div className={styles.title}>Formas de Pagamento</div>
        <div className={styles.btns}>
          <div className={styles.openModals} onClick={toggleOpenFormsPayment}>
            <div className={styles.text}>Adicionar</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        </div>
      </div>
      {openPixWithdraw ? (
        <PixWithdraw onModalChange={toggleOpenPixWithdraw} />
      ) : null}
      {openBankWithdraw ? (
        <BankWithdraw onModalChange={toggleOpenBankWithdraw} />
      ) : null}
      {openFormsPayment ? (
        <AddPaymentForms onModalChange={toggleOpenFormsPayment} />
      ) : null}
    </>
  );
};
