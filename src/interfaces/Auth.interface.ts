export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  refresh: string;
  access: string;
}

export interface IContextAuth {
  handleLogin: any;
  handleLogout: () => void;
  handleOpenModalLogin: (value: boolean) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refreshUser: (refresh: boolean) => void;
  bodyLogin: ILogin;
  showModal: boolean;
  user: IUserAuth | undefined;
  extracts: IExtractsUser | undefined;
  messages: IMessagesUser | undefined;
  pixKey: IPixKeyUser | null;
  cards: ICardUser | null;
  tickets: ITicketsUser | undefined;
  isLogged: boolean;
  credits: number;
  winning: number;
  longitude: number;
  latitude: number;
  loading: boolean;
}

export interface IUserAuth {
  birth_date: null;
  credits_balance: string;
  email: string;
  extracts: IExtractsUser[];
  first_name: string;
  identification: string;
  last_name: string;
  messages: IMessagesUser[];
  description: string;
  mother_name: string;
  phone: string;
  pix_key: IPixKeyUser;
  card: ICardUser;
  referral_code: string;
  tickets: ITicketsUser[];
  winner_balance: string;
}

export interface IExtractsUser {
  cod_message: string;
  date: string;
  description: string;
  message: string;
  read_status: boolean;
  title: string;
  user: string;
  increment: number;
  value: string;
}

export interface IMessagesUser {
  cod_message: string;
  date: string;
  message: string;
  read_status: boolean;
  title: string;
  user: string;
}

export interface IPixKeyUser {
  key: any;
}

export interface ICardUser {
  card_number: string;
  cardholder_name: string;
  edit_available: boolean;
  expiration_date: string;
  security_code: string;
}

export interface ITicketsUser {
  bet_date: string;
  bet_value: number;
  created_date: string;
  id: string;
  ip_address: string | null;
  localization: {
    latitude: number;
    longitude: number;
  };
  lotteries: string[];
  modality: string;
  numbers: string[];
  payment_type: string;
  positions: number[];
  prize_data: any[]; 
  prize_winner: boolean;
  processed: boolean;
  register_number: string;
  results: any[]; 
  total_value: number;
}
