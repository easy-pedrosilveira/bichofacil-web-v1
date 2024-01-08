import { useState } from "react";
import styles from "./PaymentGame.module.css";
import Close from "assets/icons/close.svg";
import { PaymentSuccessful } from "components";
import { finallyBetInterface } from "interfaces";
import { useContext } from "react";
import AuthContext from "data/context/AuthContext";
import { apiAuth, apiRouteOpen } from "providers";
import useGameContext from "data/hooks/useGameContext";
import useBetContext from "data/hooks/useBetContext";
import { toast } from "react-toastify";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
  betData: finallyBetInterface | undefined;
  total_value: number;
}

export const PaymentGame = ({
  onModalChange,
  betData,
  total_value,
}: ModalProps) => {
  const { user, refreshUser, credits } = useContext(AuthContext);
  let hasError = false;
  const { getApiTime } = useGameContext();
  const { format } = require("date-fns");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const togglePaymentSuccessful = async () => {
    try {
      const response = await apiRouteOpen.get("/current-datetime/");
      const apiDateTime = response.data.current_datetime;

      const apiDate = new Date(apiDateTime);
      apiDate.setDate(apiDate.getDate());

      // Formatando a data
      const formattedDate = format(apiDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");

      if (betData) {
        betData.bet_date = formattedDate;
      } else if (betData) {
      }

      if (credits) {
        if (credits < total_value) {
          toast.error("Valor de créditos insuficiente!");
          hasError = true;
        }
      }

      if (!hasError) {
        refreshUser(true);
        apiAuth
          .post("/bets/", betData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            toast(response.data);
            setPaymentSuccessful(true);
            refreshUser(true);
          })
          .catch((error) => {
            if (error.response) {
              const message = error.response.data.detail;
              toast.error(message);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
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
              <div className={styles.title}>Resumo da Aposta</div>
              <div
                className={styles.close}
                onClick={(e) => onModalChange(false)}
              >
                <img src={Close} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.valueGame}>
              <div className={styles.valueTxt}>Valor do Pagamento</div>
              <div className={styles.value}>{total_value.toFixed(2)}</div>
            </div>
            <div className={styles.balance}>
              <div className={styles.valueTxt} style={{ fontWeight: "700" }}>
                Saldo em carteira
              </div>
              <div
                className={styles.valueTxt}
                style={{ fontWeight: "700", fontSize: "18px" }}
              >
                {user?.credits_balance}
              </div>
            </div>
            <div className={styles.debited}>
              Valor debitado{" "}
              <span className={styles.debitedTxt}>
                {total_value.toFixed(2)}
              </span>
            </div>
            <div className={styles.btn} onClick={togglePaymentSuccessful}>
              Pagar
            </div>
          </div>
        </div>
      </div>
      {paymentSuccessful ? (
        <PaymentSuccessful
          title="Pagamento realizado com sucesso!"
          route="/"
          onModalChange={togglePaymentSuccessful}
        />
      ) : null}
    </>
  );
};
