import { IntroBar } from "components";
import styles from "./PersonalData.module.css";
import { useContext } from "react";
import AuthContext from "data/context/AuthContext";
import { useWindowSize } from "data";

export const PersonalData = () => {
  const { user, tickets, refreshUser } = useContext(AuthContext);
  const { width } = useWindowSize();

  const formatCPF = (cpf: any) => {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: any) => {
    if (!phone) return "";

    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatDate = (birthDate: any) => {
    if (!birthDate) return "";

    const date = new Date(birthDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <IntroBar title={"Meu Perfil"} paragraph={""} />
      <div className={styles.container}>
        <div className={styles.personal}>
          <div className={styles.title}>Dados Pessoais</div>
          <div className={styles.data}>
            <div className={styles.infos}>
              <div className={styles.label}>Nome Completo</div>
              <input
                type="text"
                className={styles.input}
                value={`${user?.first_name} ${user?.last_name}`}
              />
            </div>
            <div className={styles.infos}>
              <div className={styles.label}>E-mail</div>
              <input
                type="text"
                className={styles.input}
                value={user?.email}
                readOnly
                style={{ background: "C6D6FF", opacity: "0.8" }}
              />
            </div>
            <div className={styles.infosVariant}>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Telefone</div>
                <input
                  type="text"
                  className={styles.input}
                  value={formatPhone(user?.phone)}
                  readOnly
                  style={{ background: "C6D6FF", opacity: "0.8" }}
                />
              </div>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Data de Nascimento</div>
                <input
                  type="text"
                  className={styles.input}
                  value={formatDate(user?.birth_date)}
                  readOnly
                  style={{ background: "C6D6FF", opacity: "0.8" }}
                />
              </div>
            </div>
            <div className={styles.infos}>
              <div className={styles.label}>CPF</div>
              <input
                type="text"
                className={styles.input}
                value={formatCPF(user?.identification)}
                readOnly
                style={{ background: "C6D6FF", opacity: "0.8" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.security}>
          <div className={styles.title}>Minha Senha</div>
          <div className={styles.data}>
            <div className={styles.infosCenter}>
              <div className={styles.labelCenter}>Senha Atual</div>
              <input type="password" className={styles.inputVariant} />
            </div>
            <div className={styles.infosVariant}>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Nova senha</div>
                <input
                  type="text"
                  className={styles.input}
                  style={{ background: "C6D6FF" }}
                />
              </div>
              <div
                className={styles.infos}
                style={width >= 580 ? { width: "46%" } : { width: "100%" }}
              >
                <div className={styles.label}>Repita a nova senha</div>
                <input
                  type="text"
                  className={styles.input}
                  style={{ background: "C6D6FF" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bank}>
          <div className={styles.title}>Dados Bancários</div>
          <div className={styles.data}>
            <div className={styles.infosCenter}>
              <div className={styles.labelCenter}>Chave PIX</div>
              <input
                type="text"
                className={styles.inputVariant}
                value={`${user?.pix_key?.keys || ""}`}
              />
            </div>
          </div>
        </div>
        <div className={styles.btn}>Salvar Alterações</div>
      </div>
    </>
  );
};
