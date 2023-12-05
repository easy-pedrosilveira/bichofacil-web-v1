import { useState } from "react";
import styles from "./WithdrawalProcess.module.css";
import Arrow from "assets/icons/arrow-intro.svg";
import { PixWithdraw ,BankWithdraw } from 'components';

export const WithdrawalProcess = () => {
  const [openPixWithdraw, setOpenPixWithDraw] = useState(false);
  const [openBankWithdraw , setOpenBankWithDraw] = useState(false);

  const toggleOpenPixWithdraw = () => {
    setOpenPixWithDraw(!openPixWithdraw);
  };

  const toggleOpenBankWithdraw = () => {
    setOpenBankWithDraw(!openBankWithdraw);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Realizar saque por:</div>
        <div className={styles.btns}>
          <div className={styles.openModals}>
            <div className={styles.text} onClick={toggleOpenPixWithdraw}>Pix</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
          <div className={styles.openModals}>
            <div className={styles.text} onClick={toggleOpenBankWithdraw}>Transferência Bancária</div>
            <img src={Arrow} alt="" style={{ rotate: "180deg" }} />
          </div>
        </div>
      </div>
      {openPixWithdraw ? <PixWithdraw onModalChange={toggleOpenPixWithdraw}/> : null}
      {openBankWithdraw ? <BankWithdraw onModalChange={toggleOpenBankWithdraw}/> : null}
    </>
  );
};
