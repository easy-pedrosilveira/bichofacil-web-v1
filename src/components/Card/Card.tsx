import React, { useState } from "react";
import styles from "./Card.module.css";
import { DeletePaymentMethod } from "components";

interface CardProps {
  props: any;
}

export const Card = ({ props }: CardProps) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <div className={styles.contentCard}>
        <div className={styles.innerContent}>
          <div className={styles.topContent}>
            <h3>{props?.type}</h3>
            <button type="button" onClick={toggleDelete}>
              {props?.type === "PIX" ? "Excluir chave" : "Excluir cartão"}
            </button>
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.item}>
              <span>
                {props?.type === "PIX" ? "Chave Cadastrada" : "Cartão"}
              </span>
              <div> {props?.type === "PIX" ? props?.number : props?.name} </div>
            </div>
            <div className={styles.item}>
              <span>{props?.type === "PIX" ? "Nome" : "Final"}</span>
              <div> {props?.type === "PIX" ? props?.name : props?.number} </div>
            </div>
            <div className={styles.item}>
              <span>
                {props?.type === "PIX" ? "Tipo de Chave" : "Vencimento"}
              </span>
              <div>
                {" "}
                {props?.type === "PIX"
                  ? props?.pix_type
                  : props?.card_validation}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteModal === true ? (
        <DeletePaymentMethod props={props} onModalChange={setDeleteModal} />
      ) : null}
    </>
  );
};
