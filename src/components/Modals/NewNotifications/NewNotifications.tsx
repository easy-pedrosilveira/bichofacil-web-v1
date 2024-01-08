import styles from "./NewNotifications.module.css";
import { IMessagesUser } from "interfaces";
import Close from "assets/icons/close.svg";
import { motion } from "framer-motion";
import { item } from "utils";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
  selectedNotification: IMessagesUser | null;
}

export const NewNotifications = ({
  onModalChange,
  selectedNotification,
}: ModalProps) => {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="visible"
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
        <div className={styles.header}>
          <div className={styles.innerHeader}>
            <div className={styles.intro}>Mensagem</div>
            <img src={Close} alt="" onClick={(e) => onModalChange(false)} />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.innerBody}>
            <div className={styles.title}>{selectedNotification?.title}</div>
            <div className={styles.content}>
              {selectedNotification?.message}
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <div
            className={styles.closeBtn}
            onClick={(e) => onModalChange(false)}
          >
            Fechar
          </div>
        </div>
      </div>
    </motion.div>
  );
};
