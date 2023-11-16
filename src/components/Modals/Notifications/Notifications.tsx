import styles from "../../../styles/components/Modals/Notifications.module.css";
import { Link } from "react-router-dom";
import useAuthContext from "data/hooks/useAuthContext";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { apiAuth } from "providers";
import { motion } from "framer-motion";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const Notifications = ({ onModalChange }: ModalProps) => {
//   const { user, refreshUser } = useAuthContext();
//   const newMessages = user?.messages || [];

  const markReadMessage = async (messageId: string) => {
    try {
      await apiAuth
        .get(`/message/${messageId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(function (response) {
        //   refreshUser(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.union}></div>
        <header className={styles.header}>
          <div className={styles.titleHeader}>Notificações</div>
        </header>
        <div className={styles.bodyModal}>
          {/* {newMessages.length > 0 ? (
            newMessages.map((message, index) => (
              <div
                className={styles.Noti}
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
                <div className={styles.info}>
                  <div className={styles.titles}>{message?.title}</div>
                  <div className={styles.texts}>{message?.message}</div>
                  <div className={styles.dates}>
                    {format(new Date(message?.date), "HH:mm  dd/MM")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.null}>Nenhuma notificação disponível.</div>
          )} */}
        </div>
      </div>
    </div>
  );
};
