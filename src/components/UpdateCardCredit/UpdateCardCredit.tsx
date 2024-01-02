import { useState } from "react";
import styles from "../RegisterPaymetForms/RegisterPaymetForms.module.css";
import InputMask from "react-input-mask";
import { apiAuth } from "providers";
import { toast } from "react-toastify";

export const UpdateCardCredit = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleCardNumberChange = (event: any) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event: any) => {
    setExpirationDate(event.target.value);
  };

  const handleSecurityCodeChange = (event: any) => {
    setSecurityCode(event.target.value);
  };

  const handleCardholderNameChange = (event: any) => {
    setCardholderName(event.target.value);
  };

  const handleSubmit = async () => {
    const formattedData = {
      card_number: cardNumber.replace(/\s/g, ""),
      expiration_date: expirationDate,
      security_code: securityCode,
      cardholder_name: cardholderName,
    };

    try {
      const response = await apiAuth.put("/cards/", formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Passa o token no cabeçalho da solicitação
        },
      });

      if (response.status === 201) {
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
    <div className={styles.creditArea}>
      <form>
        <div className={styles.handleInputVariant}>
          <span>Número do cartão</span>
          <InputMask
            mask={"9999 9999 9999 9999"}
            required
            placeholder="1234 1234 1234 1234"
            onChange={handleCardNumberChange}
          />
        </div>
        <div className={styles.break}>
          <div className={styles.handleInputVariant}>
            <span>Validade</span>
            <InputMask
              mask={"99/99"}
              required
              placeholder="mm/aa"
              onChange={handleExpirationDateChange}
            />
          </div>
          <div className={styles.handleInputVariant}>
            <span>Código de segurança</span>
            <InputMask
              mask={"999"}
              required
              placeholder="123"
              onChange={handleSecurityCodeChange}
            />
          </div>
        </div>
        <div className={styles.handleInputVariant}>
          <span>Nome do titular</span>
          <input type="text" required onChange={handleCardholderNameChange} />
        </div>
      </form>
      <button type="button" onClick={handleSubmit}>
        Cadastrar
      </button>
    </div>
  );
};
