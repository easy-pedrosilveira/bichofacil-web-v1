import styles from "./Aposta.module.css";
import { useEffect, useState } from "react";
import { BuyCredits } from "components";
import user from "data/user.json";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Aposta {
  onModalChange: (isOpen: boolean) => void;
}

export const Aposta = () => {
  const [buyCredits, setBuyCredits] = useState(false);
  const [logado, setLogado] = useState(true);
  const location = useLocation();
  const iframeSrc = new URLSearchParams(location.search).get("iframeSrc");
  const toggleBuyCredits = () => {
    setBuyCredits(!buyCredits);
  };

  return (
    <div className={styles.cts}>
      <div className={styles.contem}>
        <div className={styles.jogo}>
          {iframeSrc ? (
            <iframe
              src={iframeSrc}
              title="Jogo Específico"
              width="100%"
              height="500px"
              frameBorder="0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            ></iframe>
          ) : null}
        </div>
        <div className={styles.compra}>
          <div className={styles.inf}>
            {logado === true ? (
              <h4 className={styles.saldo} onClick={toggleBuyCredits}>
                Saldo: {user?.winner_balance}
              </h4>
            ) : null}
            {buyCredits ? (
              <BuyCredits onModalChange={toggleBuyCredits} />
            ) : null}
            <p className={styles.cedula} onClick={toggleBuyCredits}>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
