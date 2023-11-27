import React, { useState } from "react";
import styles from "../RegisterCard/RegisterCard.module.css";
import InputMask from "react-input-mask";

export const AddPix = () => {
  const [mask, setMask] = useState<string>("999.999.999-99");
  const [title, setTitle] = useState<string>("CPF");
  const [option, setOption] = useState<string>("cpf");
  const [placeholder, setPlaceholder] = useState<string>('Insira o CPF');
  const [inputValue, setInputValue] = useState<string>('');

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOption(value);
    setInputValue('');

    switch (value) {
      case "cpf":
        setMask("999.999.999-99");
        setTitle("CPF");
        setPlaceholder('Insira o CPF');
        break;
      case "celular":
        setMask("(99)99999-9999");
        setTitle("Celular");
        setPlaceholder('Insira o Celular');
        break;
      case "email":
        setMask("");
        setTitle("Email");
        setPlaceholder('Insira o Email');
        break;
      case "chaveAleatoria":
        setMask("");
        setTitle("Chave aleatória");
        setPlaceholder('Insira a Chave aleatória');
        break;
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
            value="celular"
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
            value="chaveAleatoria"
            onChange={handleRadioChange}
          />
          <span>Chave aleatória</span>
        </div>
        <div className={styles.inputText}>
          <div className={styles.handleInput}>
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
          <button>Cadastrar</button>
        </div>
      </form>
    </div>
  );
};
