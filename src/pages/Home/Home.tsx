import {
  ControlPromotional,
  Opportunity,
  NewGames,
  You2Recommendations,
  DailyJackpots,
  GameProviders,
} from "components";

export const Home = () => {
  return (
    <>
      <ControlPromotional />
      <Opportunity />
      <NewGames />
      <You2Recommendations />
      <DailyJackpots />
      <GameProviders />
    </>
  );
};
