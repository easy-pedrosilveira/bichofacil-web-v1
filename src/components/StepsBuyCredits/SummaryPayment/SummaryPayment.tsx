import styles from "./SummaryPayment.module.css";
import { useState } from "react";
import useAuthContext from "data/hooks/useAuthContext";
import { RegisterPaymetForms, PaymentCompleted } from "components";
import { toast } from "react-toastify";

interface StepsProps {
  typePayment: string;
  depositValue: number;
  nextStep: () => void;
  onSubmit: () => void;
}

export const SummaryPayment = ({
  typePayment,
  depositValue,
  nextStep,
  onSubmit,
}: StepsProps) => {
  const { user, pixKey, cards } = useAuthContext();
  const [openPaymentFinnaly, setOpenPaymentFinnaly] = useState(false);
  const winningBalance = parseFloat(user?.winner_balance || "0");

  const tooglePaymentFinnaly = () => {
    setOpenPaymentFinnaly(!openPaymentFinnaly);
  };

  const formatCardNumber = (cardNumber: string): string => {
    const maskedCardNumber = "**** **** ****" + cardNumber.slice(-4);
    return maskedCardNumber;
  };

  const cardNumber = cards?.card_number || "";

  const PaymentFinnaly = () => {
    if (typePayment === "pix" || typePayment === "boleto") {
      // submitPayment();
      nextStep();
    } else if (typePayment === "prize") {
      if (winningBalance < depositValue) {
        toast.error("Saldo insuficiente");
      } else {
        tooglePaymentFinnaly();
        // submitPayment();
      }
    }
  };

  return (
    <>
      <div className={styles.step}>
        <div className={styles.valueSelected}>
          <div className={styles.box}>
            <div className={styles.sifrao}>R$</div>
            <div className={styles.value}>{depositValue.toFixed(2)}</div>
          </div>
        </div>
        <div className={styles.formsPayment}>
          {typePayment === "pix" && pixKey?.key?.length > 0 ? (
            <>
              <div className={styles.infos}>
                <div className={styles.label}>Chave pix cadastrada</div>
                <input
                  type="text"
                  className={styles.input}
                  value={pixKey?.key}
                />
              </div>
              <div className={styles.btn} onClick={PaymentFinnaly}>
                Pagar
              </div>
            </>
          ) : typePayment === "boleto" ? (
            <>
              <div className={styles.infos}>
                <div className={styles.label}>Email</div>
                <input
                  type="text"
                  className={styles.input}
                  value={user?.email}
                />
              </div>
              <div className={styles.btn} onClick={PaymentFinnaly}>
                Pagar
              </div>
            </>
          ) : typePayment === "prize" ? (
            <>
              <div className={styles.infos}>
                <div className={styles.label}>Saldo de Prêmios</div>
                <input
                  type="text"
                  className={styles.input}
                  value={user?.winner_balance}
                />
              </div>
              <div className={styles.btn} onClick={PaymentFinnaly}>
                Pagar
              </div>
            </>
          ) : typePayment === "credit_card" &&
            cards !== null &&
            typeof cards === "object" &&
            Object.keys(cards).length === 0 ? (
            <>
              <div className={styles.infos}>
                <div className={styles.label}>Número do Cartão</div>
                <input
                  type="text"
                  className={styles.input}
                  value={formatCardNumber(cardNumber)}
                />
              </div>
              <div className={styles.infoVariant}>
                <div className={styles.infos}>
                  <div className={styles.label}>Validade</div>
                  <input
                    type="text"
                    className={styles.input}
                    value={cards?.expiration_date}
                  />
                </div>
                <div className={styles.infos} id={styles.cvc}>
                  <div className={styles.label}>CVC</div>
                  <input
                    type="text"
                    className={styles.input}
                    value={cards?.security_code}
                  />
                </div>
              </div>
              <div className={styles.infos}>
                <div className={styles.label}>Nome do Titular</div>
                <input
                  type="text"
                  className={styles.input}
                  value={cards?.cardholder_name}
                />
              </div>
              <div className={styles.btn} onClick={PaymentFinnaly}>
                Realizar Pagamento
              </div>
            </>
          ) : (
            <>
              {typePayment === "credit_card" || typePayment === "pix" ? (
                <>
                  <div className={styles.nothing}>
                    Nenhuma forma de pagamento cadastrada!
                  </div>
                  <div
                    className={styles.btn}
                    style={{
                      background: "transparent",
                      border: "2.6px solid #71C638",
                      textTransform: "capitalize",
                    }}
                    onClick={(e) => {}}
                  >
                    Cadastrar {typePayment}
                  </div>
                </>
              ) : null}
              {typePayment === "credit_card" ? null : (
                <div className={styles.btn} onClick={PaymentFinnaly}>
                  Pagar
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* <RegisterPaymetForms typePayment={typePayment} /> */}
      {openPaymentFinnaly ? (
        <PaymentCompleted depositValue={depositValue} />
      ) : null}
    </>
  );
};
