import React, { useState } from "react";
import styles from "./BetHistory.module.css";

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
    numeroPule: "ASJOI3434ASDA",
    dataAposta: "22/11/2022",
    aposta: "Milhar - 1º ao 5º Prêmio",
    numerosApostados: ["2564", "3595", "6958"],
    dataLoteria: "23/11/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 20,00",
  },
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
    numeroPule: "ASJOI3434ASDA",
    dataAposta: "22/11/2022",
    aposta: "Milhar - 1º ao 5º Prêmio",
    numerosApostados: ["2564", "3595", "6958"],
    dataLoteria: "23/11/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 20,00",
  },
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
    numeroPule: "ASJOI3434ASDA",
    dataAposta: "22/11/2022",
    aposta: "Milhar - 1º ao 5º Prêmio",
    numerosApostados: ["2564", "3595", "6958"],
    dataLoteria: "23/11/2022",
    loteria: "PTN - 18h",
    totalApostado: "R$ 20,00",
  },
];

const itemsPerPage = 3;

export const BetHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBetHistories = betHistories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(betHistories.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.container}>
      {displayedBetHistories.map((bet, index) => (
        <div className={styles.betHistory} key={index}>
          {[
            { title: "Nº da Pule", dataKey: "numeroPule" },
            { title: "Data da Aposta", dataKey: "dataAposta" },
            { title: "Aposta", dataKey: "aposta" },
            { title: "Números", dataKey: "numerosApostados" },
            { title: "Data Loteria", dataKey: "dataLoteria" },
            { title: "Loteria", dataKey: "loteria" },
            { title: "Total", dataKey: "totalApostado" },
          ].map((item, i) => (
            <div
              key={i}
              className={i % 2 === 0 ? styles.column : styles.columnDark}
            >
              <div className={styles.title}>{item.title}</div>
              <div className={styles.data}>
                {Array.isArray(bet[item.dataKey])
                  ? (bet[item.dataKey] as string[]).join(" - ")
                  : bet[item.dataKey]}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{`Página ${currentPage} de ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};
