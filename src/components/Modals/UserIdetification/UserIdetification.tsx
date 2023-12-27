import styles from "./UserIdetification.module.css";
import { useState } from "react";
import { apiAuth } from "providers";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { item } from "utils";
import Close from "assets/icons/close.svg";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const UserIdetification = ({ onModalChange }: ModalProps) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await apiAuth.post("user/send/reset-password/", {
        email,
      });

      if (response.status === 200) {
        toast.success(response.data.detail);
      }
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.detail;
        toast.error(message);
      } else {
        console.error(error);
      }
    }
  };
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
        <img
          className={styles.close}
          src={Close}
          alt="close modal"
          onClick={(e) => onModalChange(false)}
        />
        <div className={styles.header}>
          <div className={styles.title}>Esqueceu sua senha?</div>
          <div className={styles.text}>
            Preencha seu email para recuperar a sua conta
          </div>
        </div>
        <div className={styles.bodyModal}>
          <div className={styles.infos}>
            <span className={styles.titleInput}>E-mail</span>
            <input
              required
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu E-mail"
            />
          </div>
          <button
            className={styles.btn}
            type="button"
            onClick={handleResetPassword}
          >
            Enviar
          </button>
        </div>
      </div>
    </motion.div>
  );
};
