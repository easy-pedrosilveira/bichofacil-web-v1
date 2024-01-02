import styles from "../../AddPaymentForms/AddPaymentForms.module.css";
import { UpdateCardComponent } from "components";
import { motion } from "framer-motion";
import { item } from "utils";
import Close from '../../../assets/icons/close.svg'

interface ModalProps {
  onModalChange: (bool : boolean) => void;
  type: string;
}

export const UpdateCard = ({ onModalChange, type }: ModalProps) => {
  return (
    <div className={styles.backDrop}>
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.modal}
      >
        <div className={styles.header}>
          <div className={styles.innerHeader}>
            <div className={styles.title}>Alterar forma de pagamento</div>
            <img src={Close} alt="" onClick={(e) => onModalChange(false)} />
          </div>
        </div>
        <div className={styles.content}>
        <UpdateCardComponent typeCard={type} />
        </div>
      </motion.div>
    </div>
  );
};
