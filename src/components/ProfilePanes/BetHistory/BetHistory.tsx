import styles from "./BetHistory.module.css";
import Arrow from "assets/icons/arrow-results.svg";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { format } from "date-fns";

const itemsPerPage = 4;

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

  const formatPositions = (positions: any) => {
    const minPosition = Math.min(...positions);
    const maxPosition = Math.max(...positions);

    return `${minPosition}º ao ${maxPosition}º Prêmio`;
  };

  return (
    <div className={styles.container}>
      {currentTickets.map((bet, index) => (
        <div className={styles.betHistory} key={index}>
          <div className={styles.columnDark}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Nº da Pule</div>
              <div className={styles.data}>{bet?.register_number}</div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Aposta</div>
              <div className={styles.data}>
                {bet?.modality} - {formatPositions(bet?.positions)}
              </div>
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Posições</div>
              <div className={styles.data}>
                {bet?.positions.length !== 0
                  ? bet.positions.map((bets, index) => (
                      <span key={index}>
                        {bets}
                        {index < bet.positions.length - 1 ? " - " : ""}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Números</div>
              <div className={styles.data}>
                {bet?.numbers.length !== 0
                  ? bet.numbers.map((bets, index) => (
                      <span key={index}>
                        {bets}
                        {index < bet.numbers.length - 1 ? " - " : ""}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Loteria</div>
              <div className={styles.data}>
                {bet.lotteries.length !== 0
                  ? bet.lotteries.map((bets, index) => (
                      <span key={index}>
                        {bets}
                        {index < bet.lotteries.length - 1 ? " - " : ""}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Data Loteria</div>
              <div className={styles.data}>
                {format(new Date(bet?.bet_date), "dd/MM/yyyy")}
              </div>
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Data Aposta</div>
              <div className={styles.data}>
                {format(new Date(bet?.created_date), "dd/MM/yyyy")}
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Valor do jogo</div>
              <div className={styles.data}>{bet?.bet_value.toFixed(2)}</div>
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.innerBetHistory}>
              <div className={styles.title}>Valor Total do Jogo</div>
              <div className={styles.data}>{bet?.total_value.toFixed(2)}</div>
            </div>
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
