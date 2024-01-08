import { IHelps } from "./Helps.interface";

export interface IBank {
  bankCode: string;
  bankName: string;
}

export interface IStartMessage {
  titulo: string;
  msgStatus: boolean;
  message: string;
}

export interface IAppConfig {
  allow_game: boolean;
  bankList: IBank[];
  bonusValue: number;
  premiopayment: boolean;
  premiopaymentperc: number;
  cardPayment: boolean;
  instantanea: boolean;
  gameVersion: number;
  pixPayment: boolean;
  promoCharge: boolean;
  refreshScreen: boolean;
  refreshTime: number;
  startMessage: IStartMessage[];
  ticketPayment: boolean;
  urlAtualization: string;
  valueCharge: number;
  whatsappNumber: string;
}

export interface IAppContext {
  helps: IHelps[];
  loading: boolean;
  appConfig: IAppConfig;
  profilePanels: number;
  setProfilePanels: (value: number) => void;
}
