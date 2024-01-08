import styles from "./Error.module.css";
import Warning from "assets/icons/alert.svg";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <img src={Warning} alt="" className={styles.error} />
      <div className={styles.txt}>
        <div className={styles.title}>Ops! Algo deu errado.</div>
        <div className={styles.paragraphs}>
          <div className={styles.paragraph}>
            Parece que encontramos um problema ao processar sua solicitação.
          </div>
          <div className={styles.paragraph}>
            Verifique sua conexão com a internet ou tente novamente mais tarde.
          </div>
          <div className={styles.paragraph}>
            Retorne a tela inicial se o problema persistir, entre em contato com
            o suporte técnico.
          </div>
        </div>
      </div>
      <button className={styles.btn} onClick={() => navigate("/")}>
        Voltar para o início
      </button>
    </main>
  );
};
