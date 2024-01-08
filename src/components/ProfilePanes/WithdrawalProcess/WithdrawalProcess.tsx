import styles from "./WithdrawalProcess.module.css";
import { useState } from "react";
import Arrow from "assets/icons/arrow-intro.svg";
import { PixWithdraw, BankWithdraw } from "components";
import { toast } from "react-toastify";

export const WithdrawalProcess = () => {
  const [openPixWithdraw, setOpenPixWithDraw] = useState(false);
  const [openBankWithdraw, setOpenBankWithDraw] = useState(false);

  const toggleOpenPixWithdraw = () => {
    setOpenPixWithDraw(!openPixWithdraw);
  };

  const toggleOpenBankWithdraw = () => {
    // setOpenBankWithDraw(!openBankWithdraw);
    toast.info("Desativado no momento!");
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
          <div
            className={styles.openModals}
            onClick={toggleOpenBankWithdraw}
            style={{ opacity: "0.7" }}
          >
            <div className={styles.text}>Transferência Bancária</div>
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
    </>
  );
};
