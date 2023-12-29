export interface IBuyCredits {
    page: number;
    handleDepositData: (value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export interface IPurchase {
    Payment_info: string;
    qrcode: string;
    payment_type: string;
    user: string;
    qrcode_text: string;
  }