import styles from "./PixWithdraw.module.css";
import useAuthContext from "data/hooks/useAuthContext";
import Close from "assets/icons/close.svg";
import { toast } from "react-toastify";
import { apiAuth } from "providers";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { PaymentSuccessful } from "../PaymentSuccessful";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const PixWithdraw = ({ onModalChange }: ModalProps) => {
  const { user, refreshUser } = useAuthContext();
  const [inputValue, setInputValue] = useState<number>(0);
  const [withDrawSuccessful, setWithDrawSuccessful] = useState(false);
  const pix = user?.pix_key;
  const [loading, setLoading] = useState<boolean>(false);
  let BalanceString = user?.credits_balance || "0";
  let BalanceNumber = parseFloat(BalanceString);

  const toggleWithDrawSuccessful = () => {
    setWithDrawSuccessful(!withDrawSuccessful);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let error: boolean = false;

    if (inputValue <= 0) {
      toast.error("O número de créditos precisa ser maior que 0");
      setInputValue(0);
      error = true;
    }
    if (inputValue > BalanceNumber) {
      toast.error(`Valor máximo para aposta é: ${user?.credits_balance}`);
      setInputValue(0);
      error = true;
    }

    if (
      pix !== null &&
      typeof pix === "object" &&
      Object.keys(pix).length === 0
    ) {
      toast.error(`Cadastre um pix no perfil!`);
      setInputValue(0);
      error = true;
    }

    const pixData = {
      withdrawal_amount: inputValue,
      receiving_method: "pix",
    };
    if (error === false) {
      try {
        const response = await apiAuth.post("/withdraw/", pixData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          toast.success(response.data.detail);
          refreshUser(true);
          toggleWithDrawSuccessful(); // ou onModalChange(false);
        }
      } catch (error: any) {
        if (error.response) {
          const message = error.response.data.detail;
          onModalChange(false);
          toast.error(message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false); // Define loading como false após o término do processamento, independentemente do sucesso ou falha
      }
    } else {
      setLoading(false);
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
              <div className={styles.title}>Saque por PIX</div>
              <div
                className={styles.close}
                onClick={(e) => onModalChange(false)}
              >
                <img src={Close} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.infos}>
              <div className={styles.label}>Digite o valor</div>
              <input
                type=""
                placeholder="R$ 0,00"
                className={styles.input}
                onChange={(e) => setInputValue(parseFloat(e.target.value))}
              />
              <div className={styles.valueUser}>
                Valor disponível para saque: R$ {user?.winner_balance}
              </div>
            </div>
            {loading ? (
              <ThreeDots
                height="60"
                width="60"
                color="#202B9B"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <>
                <div className={styles.infos}>
                  <div className={styles.label}>Chave pix:</div>
                  {pix !== null &&
                    typeof pix === "object" &&
                    Object.keys(pix as object).length > 0 && (
                      <div className={styles.valueKey}>{pix?.key}</div>
                    )}
                  {pix !== null &&
                    typeof pix === "object" &&
                    Object.keys(pix).length === 0 && (
                      <div
                        className={styles.valueKey}
                        style={{ textAlign: "center" }}
                      >
                        Nenhuma chave pix cadastrada!
                      </div>
                    )}
                </div>
                <div className={styles.btn} onClick={handleSubmit}>
                  Sacar
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {withDrawSuccessful ? (
        <PaymentSuccessful
          title="Saque realizado com sucesso!"
          route="/notifications"
          onModalChange={toggleWithDrawSuccessful}
        />
      ) : null}
    </>
  );
};
