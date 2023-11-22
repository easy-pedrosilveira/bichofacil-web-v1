import React from "react";
import styles from "./Account.module.css";
import dataUser from "../../../data/user.json";

export const Account = () => {
  const user = dataUser;

  return (
    <section className={styles.sectionAccount}>
      <div className={styles.account}>
        <div className={styles.left}>
          <div className={styles.title}>Nome</div>
          <div className={styles.info}>{user.full_name}</div>
          <div className={styles.title}>CPF</div>
          <div className={styles.info}>{user.identification}</div>
          <div className={styles.title}>Email</div>
          <div className={styles.info}>{user.email}</div>
          <div className={styles.title}>Jogos Ganhos?</div>
          <div className={styles.info}>{user.last_name}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.edit}>
            Editar perfil
            <div className={styles.editBtn} />
          </div>
          <div className={styles.level}> level do mano </div>
        </div>
      </div>
    </section>
  );
};
