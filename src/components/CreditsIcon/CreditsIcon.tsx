import styles from "./CreditsIcon.module.css";
import Credits from "../../assets/images/buy-credits.svg";
import { useState } from "react";
import { BuyCredits } from "components";

export const CreditsIcon = () => {
  const [buyCredits, setBuyCredits] = useState(false);
  console.log(buyCredits);

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };
  return (
    <>
      <div
        className={styles.icon}
        id={styles.credits}
        onClick={toggleBuyCredits}
      >
        <img src={Credits} alt="" />
      </div>
      {buyCredits === true ? (
        <BuyCredits onModalChange={toggleBuyCredits} />
      ) : null}
    </>
  );
};
