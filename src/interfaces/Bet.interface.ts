export interface IBetContext {
  bets: BetInterface[];
  gameType: string;
  setBets: (data: BetInterface[]) => void;
}

export interface BetInterface {
  modality: string;
  positions: number[];
  numbers: string[];
  lotteries: string[];
  bet_date: string;
  bet_value: number;
  total_value: number;
  dateNow: string;
  game_name: string;
}

export interface finallyBetInterface {
  positions: number[];
  numbers: string[];
  modality: string;
  lotteries: string[];
  bet_date: string;
  bet_value: number;
  payment_type: string;
  localization: { latitude: number; longitude: number };
}
