import styles from "./RegisterPaymetForms.module.css";
import { AddPix, AddCardCredit } from "components";

interface RegisterPaymentProps {
  typePayment: string;
}

export const RegisterPaymetForms = ({ typePayment }: RegisterPaymentProps) => {
  return (
    <main className={styles.content}>
      {typePayment === "pix" ? <AddPix /> : <AddCardCredit />}
    </main>
  );
};
