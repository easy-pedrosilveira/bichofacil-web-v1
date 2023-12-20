import styles from "./NewNotifications.module.css";
import { IMessagesUser } from "interfaces";
import Close from "assets/icons/close.svg";
import { useContext, useState } from "react";
import AuthContext from "data/context/AuthContext";
import { apiAuth } from "providers";
import { message } from "antd";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
  notifications: IMessagesUser | undefined;
}

export const NewNotifications = ({
  onModalChange,
  notifications,
}: ModalProps) => {
  const { refreshUser } = useContext(AuthContext);

 

  console.log(notifications?.read_status)

  return (
    <div
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
        //   markReadMessage(notifications?.read_status)
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.innerHeader}>
            <div className={styles.intro}>Mensagem</div>
            <img src={Close} alt="" 
            // onClick={(e) => markReadMessage(notifications?.read_status)} 
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.innerBody}>
            <div className={styles.title}>{notifications?.title}</div>
            <div className={styles.content}>{notifications?.message}</div>
          </div>
        </div>
        <div className={styles.btn}>
          <div className={styles.closeBtn} 
        //   onClick={(e) => markReadMessage(notifications?.read_status)}
          >
            Fechar
          </div>
        </div>
      </div>
    </div>
  );
};
