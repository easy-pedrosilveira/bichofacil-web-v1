import styles from "./Register.module.css";
import { useState } from "react";
import useAuthContext from "data/hooks/useAuthContext";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export const Register = () => {
  const { setModalRegister } = useAuthContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const validateAge = (value: string) => {
    const birthdate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (age < 18) {
      return "Você deve ter pelo menos 18 anos.";
    }

    return true;
  };

  console.log(errors)

  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          setModalRegister(false);
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.introduction}>Faça seu cadastro</div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.info}>
              <input
                type="text"
                className={styles.input}
                placeholder="Insira seu primeiro nome"
                required
                {...register("firstname")}
              />
            </div>
            <div className={styles.info}>
              <input
                type="text"
                className={styles.input}
                placeholder="Insira seu sobrenome"
                required
                {...register("lastname")}
              />
            </div>
            <div className={styles.info}>
              <InputMask
                mask="99/99/9999"
                type="text"
                className={styles.input}
                placeholder="Insira sua data de nascimento"
                required
                {...register("birthdate", { required: "Este campo é obrigatório.", validate: validateAge })}
              />
            </div>
            <div className={styles.info}>
              <InputMask
                mask={`999.999.999-99`}
                type="text"
                className={styles.input}
                placeholder="Insira seu cpf"
                required
                {...register("cpf")}
              />
            </div>
            <div className={styles.info}>
              <InputMask
                type="text"
                className={styles.input}
                placeholder="Insira seu telefone"
                required
                mask="(99)99999-9999"
                {...register("phonenumber")}
              />
            </div>
            <div className={styles.info}>
              <input
                type="email"
                className={styles.input}
                placeholder="Insira seu email"
                required
                {...register("email")}
              />
            </div>
            <div style={{ textAlign: "center" }}>Segurança</div>
            <div className={styles.info}>
              <input
                type="password"
                placeholder="Insira sua senha"
                autoComplete="current-password"
                required
                className={styles.input}
                {...register("password")}
              />
            </div>
            <div className={styles.info}>
              <input
                type="password"
                placeholder="Confirme sua senha"
                autoComplete="current-password"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.declaration}>
              Declaro que sou maior de 18 anos e estou de acordo com a{" "}
              <span>Política de Uso e Privacidade</span>
            </div>
            <button type="submit" className={styles.btn}>
              cadastrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
