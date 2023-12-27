import styles from "./ResetPassword.module.css";
import { apiAuth } from "providers";
import Eyes from "assets/icons/eyes.svg";
import { toast } from "react-toastify";
import { numberRegex, uppercaseRegex } from "utils";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { param1, param2 } = useParams();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const isPasswordValid = (password: string) => {
    const minLength = 8;

    return (
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
    );
  };
  // Tipagem para os parâmetros
  type ResetPasswordParams = {
    param1: string;
    param2: string;
  };

  // Função para redefinir a senha
  const resetPassword = async (
    { param1, param2 }: ResetPasswordParams,
    newPassword: string
  ) => {
    try {
      // Corpo da solicitação PATCH
      const requestBody = JSON.stringify({
        new_password: newPassword,
      });

      // Realize a solicitação usando o método fetch
      await apiAuth
        .patch(`/user/reset-password/confirm/${param1}/${param2}/`, requestBody)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data.detail);
            document.body.style.overflow = "visible";
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            const message = error.response.data.detail;
            toast.error(message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (param1 && param2 && password === confirmPassword) {
      resetPassword({ param1, param2 }, password);
    } else {
      toast.error("Houve algum erro, tente novamente!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.forms}>
          <div className={styles.title}>Criar uma nova senha</div>
          <div className={styles.content}>
            Defina sua nova senha de acesso.
            <br />
            Sua senha precisa ter pelo menos 8 caracteres, contendo letras
            maiúsculas e números{" "}
          </div>
          <div className={styles.setpsForm}>
            <div className={styles.infos}>
              <span className={styles.titleInput}>Senha</span>
              <div className={styles.inputPassword}>
                <input
                  required
                  className={styles.input}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={styles.togglePasswordButton}
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={Eyes}
                    alt="Mostrar Senha"
                    width="27px"
                    height="27px"
                  />
                </div>
              </div>
            </div>
            <div className={styles.infos}>
              <span className={styles.titleInput}>Confirmar Senha</span>
              <div className={styles.inputPassword}>
                <input
                  required
                  className={`${styles.input} ${
                    confirmPasswordVisible ? styles.showPassword : ""
                  }`}
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className={styles.togglePasswordButton}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={Eyes}
                    alt="Ocultar Senha"
                    width="27px"
                    height="27px"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className={styles.btnSubmit}
              onClick={handleSubmit}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
