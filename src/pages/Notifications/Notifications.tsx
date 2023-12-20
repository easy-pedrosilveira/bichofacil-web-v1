import styles from "./Notifications.module.css";
import { IntroBar, NewNotifications } from "components";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { apiAuth } from "providers";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Arrow from "assets/icons/arrow-results.svg";
import { IMessagesUser } from "interfaces";

export const Notifications = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const messages = user?.messages || [];
  const [notifications, setNotifications] = useState(false);
  const [dataMessage, setDataMessage] = useState<IMessagesUser>();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const toggleModalNotifications = (props: IMessagesUser) => {
    setNotifications(!notifications);
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

  const goToPage = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <IntroBar title={"Notificações"} paragraph={""} />
      <div className={styles.container}>
        <div className={styles.content}>
          {currentMessages.length > 0 ? (
            currentMessages.map((notification, index) => (
              <div
                className={styles.message}
                onClick={
                  (e) => markReadMessage(notification.cod_message)
                  // toggleModalNotifications(props)
                }
                key={index}
                style={
                  notification?.read_status === true
                    ? { background: "#fff" }
                    : { background: "" }
                }
              >
                <div className={styles.new}>
                  {notification?.read_status === true ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      className={styles.newMessage}
                    ></motion.div>
                  ) : null}
                </div>
                <div className={styles.texts}>
                  <div
                    className={styles.title}
                    style={
                      notification?.read_status === true
                        ? { color: "#324AC9" }
                        : { color: "" }
                    }
                  >
                    {notification?.title}
                  </div>
                  <div
                    className={styles.paragraph}
                    style={{
                      color:
                        notification?.read_status === true ? "#7A7786" : "",
                    }}
                  >
                    {notification?.read_status === true
                      ? notification?.message.slice(0, 43)
                      : notification?.message.slice(0, 77)}
                    ...
                  </div>
                  <div
                    className={styles.dates}
                    style={
                      notification?.read_status === true
                        ? { color: "#5F5C6B" }
                        : { color: "" }
                    }
                  >
                    {format(new Date(notification?.date), " dd/MM")}
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
      {notifications ? (
        <NewNotifications
          onModalChange={setNotifications}
          notifications={dataMessage}
        />
      ) : null}
    </>
  );
};
