import { IntroBar } from "components";
import styles from "./Notifications.module.css";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { apiAuth } from "providers";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Arrow from "assets/icons/arrow-results.svg";

export const Notifications = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const messages = user?.messages || [];
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);

  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const goToPage = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const markReadMessage = async (messageId: string) => {
    try {
      await apiAuth
        .get(`/message/${messageId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(function (response) {
          refreshUser(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IntroBar title={"Notificações"} paragraph={""} navigate={"/"} />
      <div className={styles.container}>
        <div className={styles.content}>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                className={styles.message}
                onClick={(e) => markReadMessage(message.cod_message)}
                key={index}
              >
                <div className={styles.new}>
                  {message.read_status === false ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      className={styles.messages}
                    ></motion.div>
                  ) : null}
                </div>
                <div className={styles.texts}>
                  <div className={styles.title}>{message?.title}</div>
                  <div className={styles.paragraph}>{message?.message}</div>
                  <div className={styles.dates}>
                    {format(new Date(message?.date), " dd/MM")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.null}>Nenhuma notificação disponível.</div>
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
    </>
  );
};
