import { UpdateCardCredit, UpdatePix } from "components";
import styles from "../RegisterPaymetForms/RegisterPaymetForms.module.css";

interface RegisterCardProps {
  typeCard: string;
}

export const UpdateCardComponent = ({ typeCard }: RegisterCardProps) => {
  return (
      <div className={styles.updateContent}>
        {" "}
        {typeCard === "pix" ? <UpdatePix /> : <UpdateCardCredit />}{" "}
      </div>
  );
};
