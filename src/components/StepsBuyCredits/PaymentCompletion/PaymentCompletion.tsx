import { IPayment } from "interfaces";
import styles from "./PaymentCompletion.module.css";

interface StepsProps {
  typePayment: string;
  depositValue: number;
  dataPayment: IPayment | null;
}

export const PaymentCompletion = ({
  typePayment,
  depositValue,
  dataPayment,
}: StepsProps) => {
  console.log(dataPayment);
  return (
    <div className={styles.step}>
      <div className={styles.box}>
        <div className={styles.txts}>
          <div className={styles.title}>
            {typePayment === "pix"
              ? "Você pode copiar o código do pix para pagar seus Créditos"
              : "Seu pedido foi realizado"}
          </div>
          <div className={styles.paragraph}>
            {typePayment === "pix"
              ? "Acesse o banco de sua preferência e escolha pagar via Pix copia e cola, depois cole o seguinte código."
              : "Confira em seu e-mail as informações do pedido ou acesse o Centro de mensagens para ver suas notificações"}
          </div>
        </div>
        <div className={styles.code}>
          <div className={styles.codeTxt}>
            {typePayment === "pix" ? "Código Pix" : "Código Boleto"}
          </div>
          <div className={styles.barCode}></div>
          <div className={styles.btn}>
            {typePayment === "pix"
              ? "Copiar Código"
              : "Copiar código de Barras"}
          </div>
        </div>
        <div className={styles.alert}>
          {typePayment === "pix"
            ? "Pague agora para receber seu dinheiro Instantaneamente"
            : "Caso o boleto não seja pago até o dia 25/11/2022, seu pedido será cancelado automaticamente. Não pague após esta data."}
        </div>
      </div>
      <div className={styles.btn}>Concluir</div>
    </div>
  );
};
