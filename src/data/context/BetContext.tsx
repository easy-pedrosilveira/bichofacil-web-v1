import { createContext, useEffect, useState } from "react";
import { BetInterface, IBetContext } from "interfaces";

const BetContext = createContext<IBetContext>({} as IBetContext);

export function BetsProvider(props: any) {
  const [bets, setBets] = useState<BetInterface[]>([]);
  const [gameType, setGameType] = useState<string>("");
  const [tradicional, setTradicional] = useState<boolean>(false);
  const [insta, setInsta] = useState<boolean>(false);
  const [instantLottery, setInstantLottery] = useState<string>("");

  useEffect(() => {
    if (gameType === "tradicional") {
      setTradicional(true);
      setInsta(false);
    } else if (gameType === "instantanea") {
      setInsta(true);
      setTradicional(false);
    }
  }, [gameType]);

  return (
    <BetContext.Provider
      value={{
        bets,
        gameType,
        setBets,
      }}
    >
      {props.children}
    </BetContext.Provider>
  );
}

export default BetContext;
