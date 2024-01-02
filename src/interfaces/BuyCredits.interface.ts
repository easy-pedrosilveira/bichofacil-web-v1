export interface IBuyCredits {
  page: number;
  handleDepositData: (value: number) => void;
  depositValue: number;
  handleMethodData: (formPayment: string) => void;
  typePayment: string;
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
