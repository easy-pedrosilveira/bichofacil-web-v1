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

export interface IBuyCredits {
  handleOpenModalBuyCredits: (value: boolean) => void;
  openBuyCredits: boolean;
  infoBuyCredits: InfoBuyCredits | null;
  page: number;
  handleDepositData: (value: number) => void;
  depositValue: number;
  handleMethodData: (formPayment: string) => void;
  typePayment: string;
  nextStep: () => void;
  prevStep: () => void;
}
