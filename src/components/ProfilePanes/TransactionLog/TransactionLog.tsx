import styles from "./TransactionLog.module.css";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { format } from "date-fns";
import Positive from "assets/icons/increment-positive.svg";
import Negative from "assets/icons/increment-negative.svg";
import Arrow from "assets/icons/arrow-results.svg";
import { ExtractMessage } from "components";
import { IExtractsUser } from "interfaces";

export const TransactionLog = () => {
  const { user } = useContext(AuthContext);
  const extracts = user?.extracts || [];
  const [extractMessage, setExtractMessage] = useState(false);
  const [dataExtract, setDataExtract] = useState<IExtractsUser>()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExtracts = extracts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(extracts.length / itemsPerPage);

  const goToPage = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const toggleModalExtractMessage = (props: IExtractsUser) => {
    setExtractMessage(!extractMessage);
    setDataExtract(props);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerExtracts}>
          {currentExtracts.length > 0 ? (
            currentExtracts.map((extract, index) => (
              <div
                className={styles.defaultExtracts}
                key={index}
                onClick={(e) => toggleModalExtractMessage(extract)}
              >
                <div className={styles.icon}>
                  {extract?.increment > 0 ? (
                    <img src={Positive} alt="" />
                  ) : (
                    <img src={Negative} alt="" />
                  )}
                </div>
                <div className={styles.title}>{extract?.title}</div>
                <div className={styles.hours}>
                  {format(new Date(extract?.date), "hh:mm")}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noExtracts}>
              Não há extratos disponíveis.
            </div>
          )}
        </div>
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
      {extractMessage ? (
        <ExtractMessage
          onModalChange={setExtractMessage}
          extracts={dataExtract}
        />
      ) : null}
    </>
  );
};
