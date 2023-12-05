import styles from "./BankWithdraw.module.css";
import Close from "assets/icons/close.svg";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const BankWithdraw = ({ onModalChange }: ModalProps) => {
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
        <div className={styles.header}>
          <div className={styles.innerHeader}>
            <div className={styles.title}>Saque por Transferência</div>
            <div className={styles.close}>
              <img src={Close} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.infos}>
            <div className={styles.label}>Digite o valor</div>
            <input type="text" placeholder="R$ 0,00" className={styles.input} />
            <div className={styles.valueUser}>
              Valor disponível para saque: R$ 258,00
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.label}>Selecione o banco</div>
            <input
              type="select"
              placeholder="Selecione"
              className={styles.input}
            />
          </div>
          <div className={styles.infosCheck}>
            <div className={styles.checkboxes}>
              <input
                type="checkbox"
                name=""
                id=""
                className={styles.inputCheck}
              />
              <div className={styles.labelCheckboxes}>Conta Corrente</div>
            </div>
            <div className={styles.checkboxes}>
              <input
                type="checkbox"
                name=""
                id=""
                className={styles.inputCheck}
              />
              <div className={styles.labelCheckboxes}>Conta Corrente</div>
            </div>
          </div>
          <div className={styles.infosAgencyAccount}>
            <div className={styles.infosAgency}>
              <div className={styles.label}>Agencia</div>
              <input type="text" placeholder="00000" className={styles.input} />
            </div>
            <div className={styles.infosAccount}>
              <div className={styles.label}>Conta</div>
              <input
                type="text"
                placeholder="000000-0"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.infos}>
            <div className={styles.label}>Nome completo</div>
            <input
              type="text"
              placeholder="Nome completo"
              className={styles.input}
            />
          </div>
          <div className={styles.infos}>
            <div className={styles.label}>Insira seu CPF</div>
            <input
              type="text"
              placeholder="000.000.000-00"
              className={styles.input}
            />
          </div>
          <div className={styles.btn}>Sacar</div>
        </div>
      </div>
    </div>
  );
};
