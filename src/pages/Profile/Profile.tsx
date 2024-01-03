import styles from "./Profile.module.css";
import { BuyCredits, IntroBar, SelectProfilePanes } from "components";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import Edit from "assets/icons/edit.svg";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [buyCredits, setBuyCredits] = useState(false);

  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  return (
    <>
      <main className={styles.container}>
        <IntroBar title={"Meu Perfil"} paragraph={""} />
        <div className={styles.profile}>
          <div className={styles.innerProfile}>
            <div className={styles.txt}>
              <div className={styles.userName}>{user?.first_name}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
            <Link to="/personal-data" className={styles.edit}>
              <div className={styles.icon}>
                <img src={Edit} alt="" />
              </div>
              <div className={styles.editTxt}>Editar Perfil</div>
            </Link>
          </div>
          <div className={styles.btn} onClick={toggleBuyCredits}>
            Efetuar depósito
          </div>
        </div>
        <SelectProfilePanes />
      </main>
      {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits}/> : null}
    </>
  );
};
