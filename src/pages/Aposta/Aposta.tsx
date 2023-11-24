import React from 'react'
import styles from "./Aposta.module.css";
import { useEffect, useState } from "react";
import {BuyCredits, Register, Login} from "components";
import user from "data/user.json";
import { Link } from 'react-router-dom';


interface Aposta {
    onModalChange: (isOpen: boolean) => void;
  }
  

export const Aposta = () => {

    const [buyCredits, setBuyCredits] = useState(false);
    const [logado, setLogado] = useState(true);

    const toggleBuyCredits = () => {
        setBuyCredits(!buyCredits);
    };

  return (
    <div className={styles.cts}>
      <div className={styles.contem}>

     <div className={styles.jogo}>
      <iframe  width="100%" height="100%" src='https://api-test.salsagator.com/game?token=7f9d5928053fd92c797299e8d4a0e760&pn=doublex-staging&lang=pt&game=Candy&type=FREE' ></iframe>
     </div>

     <div className={styles.compra}>
       <div className={styles.inf}>
       {logado === true ? (
       <h4 className={styles.saldo} onClick={toggleBuyCredits}>Saldo:  {user?.winner_balance}</h4>
       ) : null}
       {buyCredits ? <BuyCredits onModalChange={toggleBuyCredits} /> : null}
       <p className={styles.cedula} onClick={toggleBuyCredits}>.</p> 
       {/*<h4 className={styles.apst}>Aposta: 0,00</h4>*/}
       </div>
       
     </div>


      </div>
    </div>
  )
}
