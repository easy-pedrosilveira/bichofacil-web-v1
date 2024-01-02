import React, { useState } from "react";
import styles from "../RegisterPaymetForms/RegisterPaymetForms.module.css";
import InputMask from "react-input-mask";
import { apiAuth } from "providers";
import { toast } from "react-toastify";

export const UpdatePix = () => {
  const [mask, setMask] = useState<string>("999.999.999-99");
  const [title, setTitle] = useState<string>("CPF");
  const [option, setOption] = useState<string>("cpf");
  const [placeholder, setPlaceholder] = useState<string>("Insira o CPF");
  const [inputValue, setInputValue] = useState<string>("");

  const removeAccentsAndSymbols = (str: string) => {
    return str
      .normalize("NFD") // Normaliza para decompor os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os caracteres acentuados
      .replace(/[^\w\s]/g, ""); // Remove símbolos especiais
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOption(value);
    setInputValue("");

    switch (value) {
      case "cpf":
        setMask("999.999.999-99");
        setTitle("CPF");
        setPlaceholder("Insira o CPF");
        break;
      case "telefone":
        setMask("(99)99999-9999");
        setTitle("Celular");
        setPlaceholder("Insira o Celular");
        break;
      case "email":
        setMask("");
        setTitle("Email");
        setPlaceholder("Insira o Email");
        break;
      case "aleatorio":
        setMask("");
        setTitle("Chave aleatória");
        setPlaceholder("Insira a Chave aleatória");
        break;
    }
  };

  const handleSubmit = async () => {
    let errors = false;
    let newValue = inputValue;

    if (option === "cpf" || option === "telefone") {
      newValue = removeAccentsAndSymbols(newValue);
    }

    const pixData = {
      key: newValue,
      key_type: option,
    };

    if (pixData.key === "") {
      toast.error("Digite alguma chave!");
      errors = true;
    }

    if (errors === false) {
      try {
        const response = await apiAuth.put("/pixkeys/", pixData, {
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
    }
  };

  return (
    <div className={styles.addArea}>
      <div className={styles.title}>Tipo de chave</div>
      <form>
        <div className={styles.inputArea}>
          <input
            type="radio"
            name="pixOption"
            value="cpf"
            onChange={handleRadioChange}
          />
          <span>CPF</span>
        </div>
        <div className={styles.inputArea}>
          <input
            type="radio"
            name="pixOption"
            value="telefone"
            onChange={handleRadioChange}
          />
          <span>Celular</span>
        </div>
        <div className={styles.inputArea}>
          <input
            type="radio"
            name="pixOption"
            value="email"
            onChange={handleRadioChange}
          />
          <span>Email</span>
        </div>
        <div className={styles.inputArea}>
          <input
            type="radio"
            name="pixOption"
            value="aleatorio"
            onChange={handleRadioChange}
          />
          <span>Chave aleatória</span>
        </div>
        <div className={styles.inputText}>
          <div className={styles.handleInputVariant}>
            <span>{title}</span>
            <InputMask
              mask={mask}
              value={inputValue}
              onChange={handleInputChange}
              type={option === "email" ? "email" : "text"}
              placeholder={placeholder}
              required
            />
          </div>
          <button type="button" onClick={(e) => handleSubmit()}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};
