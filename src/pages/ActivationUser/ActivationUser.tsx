import styles from "./ActivationUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Check from "assets/icons/check-payment.svg";
import { toast } from "react-toastify";
import { apiAuth } from "providers";
import { useEffect } from "react";

export const ActivationUser = () => {
  const navigate = useNavigate();

  const { param1, param2 } = useParams();

  // Função para obter a ativação do usuário
  const activateUser = async () => {
    try {
      // Realize a solicitação usando o método fetch
      const response = await apiAuth.get(
        `/user/activation/${param1}/${param2}/`
      );

      if (response.status === 200) {
        toast.success("Ativação efetuada com sucesso!");
      }
    } catch (error: any) {
      console.error("Erro ao ativar usuário:", error);
      if (error.response) {
        const message = error.response.data.detail;
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    activateUser();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.txt}>
        <img src={Check} alt="" className={styles.success} />
        <div className={styles.title}> Bem-vindo ao nossa Plataforma! </div>
        <div className={styles.paragraph}>
          Sua conta foi ativada com sucesso, agora retorne à página inicial e
          faça o login.
        </div>
      </div>
      <button className={styles.btn} onClick={() => navigate("/")}>
        Voltar para o início
      </button>
    </main>
  );
};
