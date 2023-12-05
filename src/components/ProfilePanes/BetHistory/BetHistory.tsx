import styles from "./BetHistory.module.css";
import { useState } from "react";
import Arrow from "assets/icons/arrow-results.svg";

const betHistories = [
  {
    numeroPule: "ASJOI3434ASDA",
    dataAposta: "22/11/2022",
    aposta: "Milhar - 1º ao 5º Prêmio",
    numerosApostados: ["2564", "3595", "6958"],
    dataLoteria: "23/11/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 20,00",
  },
  {
    numeroPule: "ASJOI3434ASDB",
    dataAposta: "23/11/2022",
    aposta: "Dezenas - 1º ao 10º Prêmio",
    numerosApostados: ["104", "27", "86"],
    dataLoteria: "24/11/2022",
    loteria: "Mega Sena - 20h",
    totalApostado: "R$ 30,00",
  },
  {
    numeroPule: "ASJOI3434ASDC",
    dataAposta: "24/11/2022",
    aposta: "Quadra - 1º ao 5º Prêmio",
    numerosApostados: ["15", "28", "39"],
    dataLoteria: "25/11/2022",
    loteria: "Quina - 21h",
    totalApostado: "R$ 15,00",
  },
  {
    numeroPule: "ASJOI3434ASDD",
    dataAposta: "25/11/2022",
    aposta: "Dupla Sena - 1º ao 3º Prêmio",
    numerosApostados: ["7", "14", "22"],
    dataLoteria: "26/11/2022",
    loteria: "Dupla Sena - 19h",
    totalApostado: "R$ 25,00",
  },
  {
    numeroPule: "ASJOI3434ASDE",
    dataAposta: "26/11/2022",
    aposta: "Terno - 1º ao 10º Prêmio",
    numerosApostados: ["3", "18", "42"],
    dataLoteria: "27/11/2022",
    loteria: "Lotofácil - 20h",
    totalApostado: "R$ 18,00",
  },
  {
    numeroPule: "ASJOI3434ASDF",
    dataAposta: "27/11/2022",
    aposta: "Quina - 1º ao 5º Prêmio",
    numerosApostados: ["9", "21", "34"],
    dataLoteria: "28/11/2022",
    loteria: "Mega Sena - 21h",
    totalApostado: "R$ 22,00",
  },
  {
    numeroPule: "ASJOI3434ASDG",
    dataAposta: "28/11/2022",
    aposta: "Sena - 1º Prêmio",
    numerosApostados: ["2", "8", "16"],
    dataLoteria: "29/11/2022",
    loteria: "Quina - 20h",
    totalApostado: "R$ 50,00",
  },
  {
    numeroPule: "ASJOI3434ASDH",
    dataAposta: "29/11/2022",
    aposta: "Terno - 1º ao 5º Prêmio",
    numerosApostados: ["5", "12", "29"],
    dataLoteria: "30/11/2022",
    loteria: "Dupla Sena - 19h",
    totalApostado: "R$ 15,00",
  },
  {
    numeroPule: "ASJOI3434ASDI",
    dataAposta: "30/11/2022",
    aposta: "Quadra - 1º ao 5º Prêmio",
    numerosApostados: ["11", "25", "38"],
    dataLoteria: "01/12/2022",
    loteria: "Lotofácil - 20h",
    totalApostado: "R$ 20,00",
  },
  {
    numeroPule: "ASJOI3434ASDJ",
    dataAposta: "01/12/2022",
    aposta: "Sena - 1º Prêmio",
    numerosApostados: ["4", "19", "33"],
    dataLoteria: "02/12/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 30,00",
  },
  {
    numeroPule: "ASJOI3434ASDK",
    dataAposta: "02/12/2022",
    aposta: "Quina - 1º ao 5º Prêmio",
    numerosApostados: ["6", "15", "27"],
    dataLoteria: "03/12/2022",
    loteria: "Mega Sena - 21h",
    totalApostado: "R$ 25,00",
  },
  {
    numeroPule: "ASJOI3434ASDL",
    dataAposta: "03/12/2022",
    aposta: "Dupla Sena - 1º ao 3º Prêmio",
    numerosApostados: ["1", "9", "20"],
    dataLoteria: "04/12/2022",
    loteria: "Quina - 20h",
    totalApostado: "R$ 18,00",
  },
  {
    numeroPule: "ASJOI3434ASDM",
    dataAposta: "04/12/2022",
    aposta: "Lotofácil - 1º ao 10º Prêmio",
    numerosApostados: ["10", "23", "35"],
    dataLoteria: "05/12/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 22,00",
  },
  {
    numeroPule: "ASJOI3434ASDN",
    dataAposta: "05/12/2022",
    aposta: "Terno - 1º ao 5º Prêmio",
    numerosApostados: ["7", "16", "30"],
    dataLoteria: "06/12/2022",
    loteria: "Mega Sena - 20h",
    totalApostado: "R$ 15,00",
  },
];

const itemsPerPage = 3;

export const BetHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBetHistories = betHistories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(betHistories.length / itemsPerPage);

  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {currentBetHistories.map((bet, index) => (
        <div className={styles.betHistory} key={index}>
          <div className={styles.columnDark}>
            <div className={styles.title}>Nº da Pule</div>
            <div className={styles.data}>{bet.numeroPule}</div>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Data da Aposta</div>
            <div className={styles.data}>{bet.dataAposta}</div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Aposta</div>
            <div className={styles.data}>{bet.aposta}</div>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Números</div>
            <div className={styles.data}>
              {bet.numerosApostados.join(" - ")}
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Data Loteria</div>
            <div className={styles.data}>{bet?.dataLoteria}</div>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Loteria</div>
            <div className={styles.data}>{bet?.loteria}</div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Total</div>
            <div className={styles.data}>{bet.totalApostado}</div>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button
          className={styles.back}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <img src={Arrow} alt="" />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`${styles.totalPages} ${
              currentPage === index + 1 ? styles.selectedPage : ""
            }`}
          >
            0{index + 1}
          </div>
        ))}

        <button
          className={styles.next}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Proximo
        </button>
      </div>
    </div>
  );
};
