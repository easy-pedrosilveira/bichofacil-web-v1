import { Dispatch, SetStateAction } from 'react'

export interface ResultProps {
    animal: string
    group: string
    number: string
    position: string
  }

export interface ResultGamesProps {
  lottery_date: string
  lottery_name: string
  lottery_type: string
  result: ResultProps[]
}

export interface Modalidades {
  date: string;
  block_numbers: string[];
  modalities: IModalities[];
}

export interface IModalities {
  name: string;
  short_name: string;
  mask: string;
  allow_positions: number[];
  fixed_position: boolean;
  increment_positions: number;
  min_group_of_digits: number;
  number_of_digits: number;
  min_bet_value: number;
  max_bet_value: number;
  max_bet_length: number;
  min_allowed_number: number;
  max_allowed_number: number;
}

export interface Loterias{
    lottery_name: string
    lottery_type: string
    lottery_time: string
    lottery_day: number[]
}

export interface IGameContext {
  data: ResultGamesProps[]
  modalidades: IModalities[]
  fullModalidades: Modalidades[]
  lotteries: Loterias[]
  blockNumbers: string[]
  betDate: string
  getApiTime: () => void,
  setUrlResults: Dispatch<SetStateAction<string>>
  setBetDate: Dispatch<SetStateAction<string>>
}

