import styles from "./BuyCredits.module.css";
import { useEffect, useState } from "react";
import Pix from "../../../assets/images/Pix.svg";
import Boleto from "../../../assets/images/Barcode.svg";
import Arrow from "../../../assets/images/Angle-double-right.svg";
import { PixPayment, TicketPayment } from "components";
import { motion } from "framer-motion";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const BuyCredits = ({ onModalChange }: ModalProps) => {
  const coins = [1, 2, 5, 10, 20, 50, 100, 200, 250, 300, 500, 750, 1000];
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false);
  const [pixModal, setPixModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);

  // useEffect(() => {
  //   let interval : any;
  //   if (running && selectedValue > counter) {
  //     interval = setInterval(() => {
  //       setCounter((prevTime) => prevTime + 1);
  //     }, 1);
  //   } else if (running && selectedValue < counter) {
  //     interval = setInterval(() => {
  //       setCounter((prevTime) => prevTime - 1);
  //     }, 1);
  //   } else if (!running) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [running, counter, selectedValue]);

  // useEffect(() => {
  //   if (selectedValue > 0) {
  //     setRunning(true);
  //   }
  // }, [selectedValue]);

  // useEffect(() => {
  //   if (counter === selectedValue) {
  //     setRunning(false);
  //   }
  // }, [counter, selectedValue]);

  const toggleModalPix = () => {
    setPixModal(!pixModal);
  };
  const toggleModalTicket = () => {
    setTicketModal(!ticketModal);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className={styles.backDrop}
        onClick={(e) => {
          const containerElement = e.currentTarget as HTMLElement;
          const clickedElement = e.target as HTMLElement;
          if (containerElement === clickedElement) {
            onModalChange(false);
          }
        }}
      >
        <motion.li className={styles.modal} variants={item}>
          <div className={styles.header}>
            <div className={styles.title}>Depósito</div>
          </div>
          <div className={styles.selectValue}>
            <div className={styles.subTitle}>Selecione o valor</div>
            <div className={styles.values}>
              {coins.map((value, index) => (
                <div
                  key={index}
                  className={`${styles.coin} ${
                    selectedValue === value ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedValue(value)}
                >
                  <div className={styles.value}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.valueSelected}>
            <div className={styles.subTitle}>Valor selecionado</div>
            {selectedValue && (
              <div className={styles.selectedValue}>R${selectedValue},00</div>
            )}
          </div>
          <div className={styles.payment}>
            <div className={styles.subTitle}>Escolha o metodo de pagamento</div>
            <div className={styles.cardPayment} onClick={toggleModalTicket}>
              <div className={styles.icon}>
                <img
                  src={Boleto}
                  alt=""
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              <div className={styles.txtPayment}>Boleto</div>
              <div className={styles.arrow}>
                <img src={Arrow} alt="" />
              </div>
            </div>
            <div className={styles.cardPayment} onClick={toggleModalPix}>
              <div className={styles.icon}>
                <img src={Pix} alt="" />
              </div>
              <div className={styles.txtPayment}>Pix</div>
              <div className={styles.arrow}>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </div>
        </motion.li>
      </motion.ul>
      {pixModal === true ? <PixPayment onModalChange={toggleModalPix}/> : null}
      {ticketModal === true ? <TicketPayment onModalChange={toggleModalTicket}/> : null}
    </>
  );
};
