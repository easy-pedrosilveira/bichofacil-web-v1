import { AddCreditcard, AddPix } from "components";
import React from "react";
import styles from "./RegisterCard.module.css";

interface RegisterCardProps {
  typeCard: string;
}

export const RegisterCard = ({ typeCard }: RegisterCardProps) => {
  return (
      <div className={styles.content}>
        {" "}
        {typeCard === "pix" ? <AddPix /> : <AddCreditcard />}{" "}
      </div>
  );
};
