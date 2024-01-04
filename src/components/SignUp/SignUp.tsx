import styles from "./SignUp.module.css";
import { useState } from "react";
import useAuthContext from "data/hooks/useAuthContext";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { motion } from "framer-motion";
import { nameRegex, emailRegex, phoneRegex, passwordRegex } from "utils";
import { cpf } from "cpf-cnpj-validator";
import { apiAuth } from "providers";
import { Link } from "react-router-dom";
import Eye from "assets/icons/eye-password.svg";
import Calendar from "assets/icons/calendar.svg";

export const SignUp = () => {
  const { handleOpenModalLogin, showModal } = useAuthContext();
  const { handleSubmit } = useForm();
  const [birthdate, setBirthdate] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [cpfvalue, setCpf] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async (data: any) => {
    const nameValidation = validateName();
    const ageValidation = validateAge();
    const emailValidation = validateEmail();
    const phoneValidation = validatePhone();
    const cpfValidation = validateCpf();
    const passwordValidation = validatePassword();
    const confirmPasswordValidation = validatePasswordEqual();
    const confirmEmailValidation = validateEmailEqual();

    if (
      nameValidation &&
      ageValidation &&
      emailValidation &&
      phoneValidation &&
      cpfValidation &&
      passwordValidation &&
      confirmPasswordValidation &&
      confirmEmailValidation
    ) {
      const formData = {
        firstname,
        lastname,
        birthdate,
        cpf: cpfvalue,
        phone,
        email,
        password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      apiAuth
        .post("/user/register/", formData, config)
        .then((response) => {
          alert("Cadastro Realizado");
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.detail;
            alert(errorMessage);
          } else {
            alert("Erro desconhecido");
          }
          console.log(error);
        });
    }
  };

  const validateName = () => {
    if (!firstname.match(nameRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname: "O nome precisa conter apenas letras e espaços",
      }));
      return false;
    } else if (!lastname.match(nameRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname: "O sobrenome precisa conter apenas letras e espaços",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname: "",
        lastname: "",
      }));
      return true;
    }
  };

  const validateAge = () => {
    const MinAge = 18;
    const MaxAge = 95;

    const parts = birthdate.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      // Verificar se o formato da data é válido
      if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1900 ||
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthdate: "Data de nascimento inválida.",
        }));
        return false;
      }

      const currentDate = new Date();
      const minDate = new Date(
        currentDate.getFullYear() - MinAge,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const maxDate = new Date(
        currentDate.getFullYear() - MaxAge,
        currentDate.getMonth(),
        currentDate.getDate()
      );

      const inputDate = new Date(year, month - 1, day);

      if (inputDate >= minDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthdate: `Você deve ter no mínimo ${MinAge} anos de idade.`,
        }));
        return false;
      } else if (inputDate <= maxDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthdate: `Você deve ter no máximo ${MaxAge} anos de idade.`,
        }));
        return false;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthdate: "",
        }));
        return true;
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthdate: "Formato de data inválido.",
      }));
      return false;
    }
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor insira um email válido!",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
      return true;
    }
  };

  const validatePhone = () => {
    if (!phoneRegex.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Por favor insira um telefone válido!",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
      return true;
    }
  };

  const validateCpf = () => {
    if (!cpf.isValid(cpfvalue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpf: "Por favor insira um cpf válido!",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpf: "",
      }));
      return true;
    }
  };

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
      return true;
    }
  };

  const validatePasswordEqual = () => {
    if (password !== confirmpassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirmation: "As senhas não coincidem",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirmation: "",
      }));
      return true;
    }
  };

  const validateEmailEqual = () => {
    if (email !== confirmEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailConfirmation: "Os emails não coincidem",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailConfirmation: "",
      }));
      return true;
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ y: 900 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <div className={styles.label}>Nome Completo</div>
          <input
            type="text"
            className={styles.input}
            placeholder="Nome"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors({
                ...errors,
                firstname: "",
              });
            }}
          />
          {errors.firstname && (
            <p style={{ color: "red" }}>{errors.firstname}</p>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>E-mail</div>
          <input
            type="email"
            className={styles.input}
            placeholder="E-mail"
            required
            autoComplete="username"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: "",
              });
            }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Confirme seu E-mail</div>
          <input
            type="email"
            className={styles.input}
            placeholder="Confirme seu E-mail"
            required
            autoComplete="username"
            onChange={(e) => {
              setConfirmEmail(e.target.value);
              setErrors({
                ...errors,
                emailConfirmation: "",
              });
            }}
          />
          {errors.emailConfirmation && (
            <p style={{ color: "red" }}>{errors.emailConfirmation}</p>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>CPF</div>
          <InputMask
            mask={`999.999.999-99`}
            type="text"
            className={styles.input}
            placeholder="CPF"
            required
            onChange={(e) => {
              setCpf(e.target.value);
              setErrors({
                ...errors,
                cpf: "",
              });
            }}
          />
          {errors.cpf && <p style={{ color: "red" }}>{errors.cpf}</p>}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Data de Nascimento</div>
          <InputMask
            className={styles.input}
            mask={"99/99/9999"}
            type="text"
            placeholder="dd/mm/aaaa"
            onChange={(e) => {
              setBirthdate(e.target.value);
              setErrors({
                ...errors,
                birthdate: "",
              });
            }}
          />
          <img src={Calendar} alt="" className={styles.icon} />
          {errors.birthdate && (
            <p style={{ color: "red" }}>{errors.birthdate}</p>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Telefone</div>
          <InputMask
            type="text"
            className={styles.input}
            placeholder="(00)00000-0000"
            required
            mask="(99)99999-9999"
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({
                ...errors,
                phone: "",
              });
            }}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div className={styles.section}>Criar senha</div>
        <div className={styles.info}>
          <div className={styles.label}>Senha</div>
          <input
            type="password"
            placeholder="Insira sua senha"
            autoComplete="current-password"
            required
            className={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                ...errors,
                password: "",
              });
            }}
          />
          <img src={Eye} alt="" className={styles.icon} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div className={styles.info}>
          <div className={styles.label}>Senha</div>
          <input
            type="password"
            placeholder="Confirme sua senha"
            autoComplete="current-password"
            required
            className={styles.input}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({
                ...errors,
                passwordConfirmation: "",
              });
            }}
          />
          <img src={Eye} alt="" className={styles.icon} />
          {errors.passwordConfirmation && (
            <p style={{ color: "red" }}>{errors.passwordConfirmation}</p>
          )}
        </div>
        <div className={styles.declaration}>
          <input
            type="checkbox"
            name=""
            id=""
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          <div className={styles.text}>
            Li e concordo com os{" "}
            <Link to="" className={styles.links}>
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link to="" className={styles.links}>
              Política de Privacidade.
            </Link>
          </div>
        </div>
        <button type="submit" className={styles.btn}>
          Cadastrar
        </button>
      </form>
      <div className={styles.account}>
        Já tem uma conta?
        <div
          className={styles.login}
          onClick={(e) => handleOpenModalLogin(true)}
        >
          Entre
        </div>
      </div>
    </motion.div>
  );
};
