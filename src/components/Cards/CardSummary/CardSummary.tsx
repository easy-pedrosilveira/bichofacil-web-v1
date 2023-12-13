import styles from './CardSummary.module.css'

export const CardSummary = () => {
  return (
    <div className={styles.container}>
      {/* {currentTickets.map((bet, index) => ( */}
        <div className={styles.summaryGame} >
          <div className={styles.column}>
            <div className={styles.title}>Data da Aposta</div>
            <div className={styles.data}>
              {/* {format(new Date(bet?.created_date), "dd/MM/yyyy")} */}
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Aposta</div>
            <div className={styles.data}>
              <div className={styles.data}>
                {/* {bet?.modality} - {formatPositions(bet?.positions)} */}
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Números</div>
            <div className={styles.data}>
              {/* {bet?.numbers.length !== 0
                ? bet.numbers.map((bets, index) => (
                    <span key={index}>
                      {bets}
                      {index < bet.numbers.length - 1 ? " - " : ""}
                    </span>
                  ))
                : null} */}
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Data Loteria</div>
            <div className={styles.data}>
              {/* {format(new Date(bet?.bet_date), "dd/MM/yyyy")} */}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.title}>Loteria</div>
            <div className={styles.data}>
              {/* {bet.lotteries.length !== 0
                ? bet.lotteries.map((bets, index) => (
                    <span key={index}>
                      {bets}
                      {index < bet.lotteries.length - 1 ? " - " : ""}
                    </span>
                  ))
                : null} */}
            </div>
          </div>
          <div className={styles.columnDark}>
            <div className={styles.title}>Total</div>
            {/* <div className={styles.data}>{bet?.total_value.toFixed(2)}</div> */}
          </div>
        </div>
      {/* ))} */}
    </div>
  )
}
