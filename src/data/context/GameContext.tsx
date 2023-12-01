import { createContext, useEffect, useState } from 'react'
import { ResultGamesProps, IGameContext, Modalidades, IModalities, Loterias } from 'interfaces'
import { apiRouteOpen } from 'providers'

const GameContext = createContext<IGameContext>({} as IGameContext)

export function GameProvider(props: any) {
  const [data, setData] = useState<ResultGamesProps[]>([]);
  const [lotteries, setLotteries] = useState<Loterias[]>([]);
  const [fullLotteries, setFullLotteries]= useState<Loterias[]>([])
  const [fullModalidades, setfullModalities] = useState<Modalidades[]>([]);
  const [modalidades, setModalidades] = useState<IModalities[]>([]);
  const [blockNumbers, setBlockNumbers] = useState<string[]>([]);
  const [time, setTime] = useState<Date>(new Date());
  const [urlResults, setUrlResults] = useState<string>('/results/');
  const [betDate, setBetDate] = useState<string>('');

  async function getResultsData() {
    apiRouteOpen
      .get('/results/')
      .then(function (response) {
        setData(response.data.results)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getResultsData()
  }, [urlResults])

  async function getLotteriesData() {
    apiRouteOpen
      .get('/lotteries/')
      .then(function (response) {
        setFullLotteries(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async function getFilteredLotteries(props: string) {
    apiRouteOpen
      .get(`/lotteries/?date_check=${props}`)
      .then(function (response) {
        setLotteries(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getLotteriesData()
    getFilteredLotteries(betDate)
  }, [urlResults, betDate])

  async function getApiTime() {
    try {
      const response = await apiRouteOpen.get('/current-datetime/');
      return response.data.current_datetime;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getModalitiesData() {
    apiRouteOpen
      .get('/modalities/')
      .then(function (response) {
        setModalidades(response.data.modalities)
        setfullModalities(response.data)
        setBlockNumbers(response.data.block_numbers)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getModalitiesData()
    getApiTime()
  },[])

  return (
    <GameContext.Provider
      value={{
        data,
        fullModalidades,
        modalidades,
        blockNumbers,
        betDate,
        lotteries,
        getApiTime,
        setUrlResults,
        setBetDate,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContext
