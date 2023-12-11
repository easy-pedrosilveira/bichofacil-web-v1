import styles from "./BetHistory.module.css";
import Arrow from "assets/icons/arrow-results.svg";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";

const itemsPerPage = 3;

export const BetHistory = () => {
  const { user } = useContext(AuthContext);
  const tickets = user?.tickets || [];
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = tickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const goToPage = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(tickets)

  return (
    <div className={styles.container}>
      {currentTickets.map((bet, index) => (
        <div className={styles.betHistory} key={index}>
          <div className={styles.columnDark}>
            <div className={styles.title}>Nº da Pule</div>
            {/* <div className={styles.data}>{bet.numeroPule}</div> */}
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Data da Aposta</div>
            {/* <div className={styles.data}>{bet.dataAposta}</div> */}
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Aposta</div>
            {/* <div className={styles.data}>{bet.aposta}</div> */}
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Números</div>
            <div className={styles.data}>
              {/* {bet.numerosApostados.join(" - ")} */}
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Data Loteria</div>
            {/* <div className={styles.data}>{bet?.dataLoteria}</div> */}
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Loteria</div>
            {/* <div className={styles.data}>{bet?.loteria}</div> */}
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Total</div>
            {/* <div className={styles.data}>{bet.totalApostado}</div> */}
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
