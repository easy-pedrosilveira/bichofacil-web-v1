import React from 'react'
import styles from "./Aposta.module.css";
import { useEffect, useState } from "react";
import {BuyCredits} from "components";
import user from "data/user.json";




export const Aposta = () => {
    const [buyCredits, setBuyCredits] = useState(false);


    const toggleBuyCredits = () => {
        setBuyCredits(!buyCredits);
    };

  return (
    <div className={styles.cts}>
      <div className={styles.contem}>

     <div className={styles.jogo}>
      <iframe  width="100%" height="100%" src='https://www.ojogodosbichos.com/' ></iframe>
     </div>

     <div className={styles.compra}>
       <div className={styles.inf}>
       <h4 className={styles.saldo} onClick={toggleBuyCredits}>Saldo: {user?.winner_balance}</h4>
       {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits} /> : null}
       <p className={styles.cedula} onClick={toggleBuyCredits}>.</p> 
       <h4 className={styles.apst}>Aposta: 0,00</h4>
       </div>
       
     </div>


      </div>
    </div>
  )
}
