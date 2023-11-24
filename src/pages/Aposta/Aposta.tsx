import React from 'react'
import styles from "./Aposta.module.css";
import Nbranca from '../../assets/images/branco.png';


export const Aposta = () => {
  return (
    <div className={styles.cts}>
      <div className={styles.contem}>

     <div className={styles.jogo}>
      <iframe  width="100%" height="100%" src='https://www.ojogodosbichos.com/' ></iframe>
     </div>

     <div className={styles.compra}>
       <div className={styles.inf}>
       <h4 className={styles.saldo}>Saldo: 20,00</h4>
       <p className={styles.cedula}>.</p> 
       <h4 className={styles.apst}>Aposta: 0,00</h4>
       </div>
       
     </div>


      </div>
    </div>
  )
}
