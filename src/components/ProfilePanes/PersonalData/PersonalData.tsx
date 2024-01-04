import styles from "./PersonalData.module.css";
import { IntroBar, BankData } from "components";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { useWindowSize } from "data";

export const PersonalData = () => {
  const { user } = useContext(AuthContext);
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
                style={width >= 635 ? { width: "45%" } : { width: "100%" }}
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
                style={width >= 635 ? { width: "45%" } : { width: "100%" }}
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
        <div className={styles.bank}>
          <div className={styles.title}>Dados Bancários</div>
          <div className={styles.data}>
            <BankData />
          </div>
        </div>
      </div>
    </>
  );
};
