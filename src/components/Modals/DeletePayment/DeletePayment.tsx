import styles from "./DeletePayment.module.css";
import { apiAuth } from "providers";
import { motion } from "framer-motion";
import { item } from "utils";
import { toast } from "react-toastify";
import Alert from "assets/icons/alert.svg";
import Close from "assets/icons/close.svg";

interface DeleteModalProps {
  onModalChange: (value: boolean) => void;
  props: any;
}

export const DeletePayment = ({ onModalChange }: DeleteModalProps) => {
  const deleteMethod = () => {
    apiAuth
      .post("/disable-method/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Cartão excluído!");
        } else {
          console.error("Houve algum erro!");
        }
      })
      .catch((error) => {
        if (error.response) {
          const message = error.response.data.detail;
          toast.error(message);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className={styles.modal}
      >
        <img
          src={Close}
          alt=""
          className={styles.close}
          onClick={(e) => onModalChange(false)}
        />
        <div className={styles.introduction}>
          <img src={Alert} alt="" className={styles.error} />
          <div className={styles.insufficient}>Excluir metodo de pagamento</div>
          <div className={styles.paragraph}>
            Tem certeza de que deseja excluir permanentemente esse método de
            pagamento? Esta ação não pode ser desfeita.
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.cancel} onClick={() => onModalChange(false)}>
            Cancelar
          </div>
          <div className={styles.confirm} onClick={deleteMethod}>
            Confirmar
          </div>
        </div>
      </motion.div>
    </main>
  );
};
