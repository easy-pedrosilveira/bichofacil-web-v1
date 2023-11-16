import styles from "../../../styles/components/Modals/BuyCredits.module.css";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const BuyCredits = ({ onModalChange }: ModalProps) => {
  return (
    <main
      className={styles.backDrop}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement;
        const clickedElement = e.target as HTMLElement;
        if (containerElement === clickedElement) {
          onModalChange(false);
        }
      }}
    >
      <div className={styles.modal}>BuyCredits</div>
    </main>
  );
};
