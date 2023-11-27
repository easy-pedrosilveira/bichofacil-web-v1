import styles from "./ModalPayment.module.css";
import { useEffect, useState } from "react";
import QrCode from "../../../assets/images/qr-code.svg";

interface ModalProps {
  onModalChange: (isOpen: boolean) => void;
}

export const TicketPayment = ({ onModalChange }: ModalProps) => {
  // const { user, DecryptPass } = useAuthContext()
  // const { value, setReturnPix } = useBuyCreditsContext()
  // const { returnPix } = useBuyCreditsContext()
  const [loading, setLoading] = useState(false);
  // const { appConfig } = useAppContext()
  const [isModal, setIsModal] = useState(false);
  const [terceiroComponenteAberto, setTerceiroComponenteAberto] =
    useState(true);

  // async function paymentPix() {
  //   setLoading(true)

  //   const body: IPaymentPix = {
  //     PaymentMethod: '6',
  //     username: user.email,
  //     value,
  //     cardNumber: '',
  //     holder: '',
  //     expirationDate: '',
  //     securityCode: '',
  //     brand: '',
  //     identification: user.identification
  //       .replaceAll('.', '')
  //       .replaceAll('-', ''),
  //     nascDate: '',
  //   }

  //   const password = await DecryptPass(Cookies.get('userhashJogoDoBicho'))

  //   await axios({
  //     method: 'post',
  //     url: process.env.NEXT_PUBLIC_BASE_URL + '/sale/',
  //     data: JSON.stringify(body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     auth: {
  //       username: user.username,
  //       password,
  //     },
  //   })
  //     .then((response) => {
  //       setReturnPix(response.data.description)
  //       setLoading(false)
  //       setIsModal(true)
  //     })
  //     .catch((e) => {
  //       toast.error(
  //         'Houve algum erro na solicitação. Confira seus dados e tente novamente.'
  //       )
  //       fecharComponentes
  //       setLoading(false)
  //     })
  // }

  // useEffect(() => {
  //   paymentPix()
  // }, [])

  const returnPix = {
    Description: "",
    Key: "20138903819083190831908310978278972893727",
    QrCode: QrCode,
  };

  function copyToClipboard(e: any) {
    const textToCopy = returnPix?.Key;
    navigator.clipboard.writeText(textToCopy);
    alert("Copiado para área de transferência!");
  }

  return (
    <main className={styles.backDrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>
            Use a câmera para ler o QR Code e efetuar o pagamento com o PIX.
          </div>
        </div>
        <div className={styles.copy}>
          <input
            type="text"
            className={styles.code}
            value={returnPix?.Key}
            readOnly
          />
        </div>
        <div className={styles.qrCode}>
          <div className={styles.backqrcode}>
            <img
              src={returnPix?.QrCode}
              alt="QrCode"
              className={styles.imageQrcode}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.btnCopy} onClick={(e) => copyToClipboard(e)}>
            Copiar Código PIX
          </div>
          <div
            className={styles.finalization}
            onClick={(e) => onModalChange(false)}
          >
            Finalizar
          </div>
        </div>
      </div>
    </main>
  );
};
