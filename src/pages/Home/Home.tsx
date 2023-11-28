import {
  ControlPromotional,
  Opportunity,
  NewGames,
  You2Recommendations,
  DailyJackpots,
  GameProviders,
  BonusModal,
} from "components";
import { useState } from "react";

export const Home = () => {
  const [bonus, setBonus] = useState(true);

  return (
    <>
      <ControlPromotional />
      <Opportunity />
      <NewGames />
      <You2Recommendations />
      <DailyJackpots />
      <GameProviders />
      {bonus ? <BonusModal onModalChange={setBonus}/> : null}
    </>
  );
};
