import { apiAuth } from "providers";
import styles from "./DeletePaymentMethod.module.css";
import { motion } from "framer-motion";
import { item } from "utils";

interface DeleteModalProps {
  onModalChange: (value: boolean) => void;
  props: any;
}

export const DeletePaymentMethod = ({
  onModalChange,
  props,
}: DeleteModalProps) => {
  const deleteMethod = () => {
    apiAuth
      .post("/disable-method", {
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
        console.error("Erro na requisição:", error);
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
        <div className={styles.title}>
          {props?.type === "PIX" ? "Excluir chave" : "Excluir cartão"}
        </div>
        <div className={styles.subTitle}>
          {props?.type === "PIX" ? props?.number : props?.name}
        </div>
        <div className={styles.paragraph}>
          Tem certeza de que deseja excluir permanentemente esse método de
          pagamento? Esta ação não pode ser desfeita.
        </div>
        <div className={styles.btns}>
          <div
            className={styles.btnCancel}
            onClick={() => onModalChange(false)}
          >
            Cancelar
          </div>
          <div className={styles.btnConfirm} onClick={deleteMethod}>
            Confirmar
          </div>
        </div>
      </motion.div>
    </main>
  );
};