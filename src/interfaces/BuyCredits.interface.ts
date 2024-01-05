export interface InfoBuyCredits {
  values: number[];
  allow_pix: boolean;
  pix_min_amount: string;
  credit_card_min_amount: string;
  boleto_min_amount: string;
  prizes_min_amount: string;
  allow_codebar: boolean;
  allow_prize: boolean;
  allow_credit_card: boolean;
  cashback_percent: number;
}

export interface Purchase {
  value: number;
  payment_type: string;
}

export interface IPayment {
  image: string;
  cod: string;
  message: string;
}

export interface IBuyCredits {
  handleOpenModalBuyCredits: (value: boolean) => void;
  handleDepositData: (value: number) => void;
  handleMethodData: (formPayment: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  postSubmitPayment: () => void;
  openBuyCredits: boolean;
  infoBuyCredits: InfoBuyCredits | null;
  page: number;
  depositValue: number;
  typePayment: string;
  dataPayment: IPayment | null;
}
