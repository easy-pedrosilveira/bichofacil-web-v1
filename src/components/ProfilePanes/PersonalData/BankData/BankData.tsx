import styles from "./BankData.module.css";
import {
  AddPaymentForms,
  IntroBar,
  UpdateCard,
  DeletePayment,
} from "components";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import Error from "assets/icons/error.svg";
import Edit from "assets/icons/edit-bank-data.svg";

export const BankData = () => {
  const { pixKey, cards } = useContext(AuthContext);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const toggleUpdate = (typeCard: string) => {
    setType(typeCard);
    setUpdateModal(!updateModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      {cards !== null &&
        typeof cards === "object" &&
        Object.keys(cards).length > 0 && (
          <div className={styles.card}>
            <div className={styles.innerCard}>
              <div className={styles.top}>
                <div className={styles.title}>Cartão de Crédito</div>
                <div className={styles.btns}>
                  <div
                    className={styles.edit}
                    onClick={(e) => toggleUpdate("card")}
                  >
                    <img src={Edit} alt="" />
                  </div>
                  <div className={styles.delete} onClick={toggleDelete}>
                    <img src={Error} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.duoData}>
                  <div className={styles.label}>Número do Cartão</div>
                  <div className={styles.data}>
                    {cards?.card_number.substring(0, 4)}
                  </div>
                </div>
                <div className={styles.datas}>
                  <div className={styles.duoData}>
                    <div className={styles.label}>Validade</div>
                    <div className={styles.data}>{cards?.expiration_date}</div>
                  </div>
                  <div className={styles.duoData}>
                    <div className={styles.label}>Nome do titular</div>
                    <div className={styles.data}>{cards?.cardholder_name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {pixKey !== null &&
        typeof pixKey === "object" &&
        Object.keys(pixKey as object).length > 0 && (
          <div className={styles.card}>
            <div className={styles.innerCard}>
              <div className={styles.top}>
                <div className={styles.title}>Transferência via PIX</div>
                <div className={styles.btns}>
                  <div
                    className={styles.edit}
                    onClick={(e) => toggleUpdate("pix")}
                  >
                    <img src={Edit} alt="" />
                  </div>
                  <div className={styles.delete} onClick={toggleDelete}>
                    <img src={Error} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.duoData}>
                  <div className={styles.label}>Chave Cadastrada</div>
                  <div className={styles.data}>{pixKey?.key}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      {cards !== null &&
        typeof cards === "object" &&
        Object.keys(cards).length === 0 &&
        pixKey !== null &&
        typeof pixKey === "object" &&
        Object.keys(pixKey).length === 0 && (
          <div style={{ textAlign: "center" }}>Nenhuma forma de pagamento cadastrada!</div>
        )}
      <div className={styles.divBtn}>
        <div
          className={styles.btn}
          onClick={(e) => {
            setAddModal(true);
          }}
        >
          Adicionar Forma de Pagamento
        </div>
      </div>
      {addModal ? <AddPaymentForms onModalChange={setAddModal} /> : null}
      {updateModal ? (
        <UpdateCard onModalChange={setUpdateModal} type={type} />
      ) : null}
      {deleteModal === true ? (
        <DeletePayment props={"oi"} onModalChange={setDeleteModal} />
      ) : null}
    </>
  );
};
