import styles from "./CreditsIcon.module.css";
import Credits from "../../assets/images/credits.svg";
import { useState } from "react";
import { BuyCredits } from "components";

export const CreditsIcon = () => {
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };
  return (
    <div className={styles.icon} id={styles.credits} onClick={toggleBuyCredits}>
      <img src={Credits} alt="" />
      {buyCredits === true ? (
        <BuyCredits onModalChange={toggleBuyCredits} />
      ) : null}
    </div>
  );
};
