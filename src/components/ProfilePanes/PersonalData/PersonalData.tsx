import { AddPaymentForms, IntroBar, UpdateCard } from "components";
import styles from "./PersonalData.module.css";
import card from "./card.module.css";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { useWindowSize } from "data";
import { DeletePayment } from "components/Modals/DeletePayment";

export const PersonalData = () => {
  const { user, pixKey, cards } = useContext(AuthContext);
  const { width } = useWindowSize();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const formatCPF = (cpf: any) => {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: any) => {
    if (!phone) return "";

    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatDate = (birthDate: any) => {
    if (!birthDate) return "";

    const date = new Date(birthDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const toggleUpdate = (typeCard: string) => {
    setType(typeCard);
    setUpdateModal(!updateModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <IntroBar title={"Meu Perfil"} paragraph={""} />
      <div className={styles.container}>
        <div className={styles.personal}>
          <div className={styles.title}>Dados Pessoais</div>
          <div className={styles.data}>
            <div className={styles.infos}>
              <div className={styles.label}>Nome Completo</div>
              <input
                type="text"
                className={styles.input}
                value={`${user?.first_name} ${user?.last_name}`}
              />
            </div>
            <div className={styles.infos}>
              <div className={styles.label}>E-mail</div>
              <input
                type="text"
                className={styles.input}
                value={user?.email}
                readOnly
                style={{ background: "C6D6FF", opacity: "0.8" }}
              />
            </div>
            <div className={styles.infosVariant}>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Telefone</div>
                <input
                  type="text"
                  className={styles.input}
                  value={formatPhone(user?.phone)}
                  readOnly
                  style={{ background: "C6D6FF", opacity: "0.8" }}
                />
              </div>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Data de Nascimento</div>
                <input
                  type="text"
                  className={styles.input}
                  value={formatDate(user?.birth_date)}
                  readOnly
                  style={{ background: "C6D6FF", opacity: "0.8" }}
                />
              </div>
            </div>
            <div className={styles.infos}>
              <div className={styles.label}>CPF</div>
              <input
                type="text"
                className={styles.input}
                value={formatCPF(user?.identification)}
                readOnly
                style={{ background: "C6D6FF", opacity: "0.8" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.security}>
          <div className={styles.title}>Minha Senha</div>
          <div className={styles.data}>
            <div className={styles.infosCenter}>
              <div className={styles.labelCenter}>Senha Atual</div>
              <input type="password" className={styles.inputVariant} />
            </div>
            <div className={styles.infosVariant}>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Nova senha</div>
                <input
                  type="text"
                  className={styles.input}
                  style={{ background: "C6D6FF" }}
                />
              </div>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Repita a nova senha</div>
                <input
                  type="text"
                  className={styles.input}
                  style={{ background: "C6D6FF" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bank}>
          <div className={styles.title}>Dados Bancários</div>
          <div className={styles.data}>
            <div className={styles.cards}>
              {cards !== null &&
                typeof cards === "object" &&
                Object.keys(cards).length > 0 && (
                  <>
                    <div className={card.contentCard}>
                      <div className={card.innerContent}>
                        <div className={card.topContent}>
                          <h3>Cartão</h3>
                          <div>
                            <button
                              type="button"
                              onClick={(e) => toggleUpdate("card")}
                            >
                              Alterar metodo
                            </button>
                            <button type="button" onClick={toggleDelete}>
                              Excluir metodo
                            </button>
                          </div>
                        </div>
                        <div className={card.bottomContent}>
                          <div className={card.item}>
                            <span>Numero do cartão</span>
                            <p>{cards.card_number.substring(0, 4)}</p>
                          </div>
                          <div className={card.item}>
                            <span>Validade</span>
                            <p>{cards.expiration_date}</p>
                          </div>
                          <div className={card.item}>
                            <span>Nome do titular</span>
                            <p>{cards.cardholder_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              {pixKey !== null &&
                typeof pixKey === "object" &&
                Object.keys(pixKey as object).length > 0 && (
                  <div className={card.contentCard}>
                    <div className={card.innerContent}>
                      <div className={card.topContent}>
                        <h3>Transferência via PIX</h3>
                        <div>
                          <button
                            type="button"
                            onClick={(e) => toggleUpdate("pix")}
                          >
                            Alterar metodo
                          </button>
                          <button type="button" onClick={toggleDelete}>
                            Excluir metodo
                          </button>
                        </div>
                      </div>
                      <div className={card.bottomContent}>
                        <div className={card.item}>
                          <span>Chave Cadastrada</span>
                          <p>{pixKey.key}</p>
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
                  <div style={{ textAlign: "center" }}>
                    Nenhuma forma de pagamento!
                  </div>
                )}
            </div>
          </div>
        </div>
        <div
          className={styles.btn}
          onClick={(e) => {
            setAddModal(true);
          }}
        >
          Adicionar Forma de Pagamento
        </div>
      </div>
      {addModal ? (
        <AddPaymentForms onModalChange={setAddModal} />
      ) : null}
      {updateModal ? (
        <UpdateCard onModalChange={setUpdateModal} type={type} />
      ) : null}
      {deleteModal === true ? (
        <DeletePayment props={"oi"} onModalChange={setDeleteModal} />
      ) : null}
    </>
  );
};
