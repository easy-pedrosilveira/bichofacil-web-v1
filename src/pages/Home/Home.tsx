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
      <div style={{width:'100%', height:'60vh', position:'relative', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
        <ControlPromotional />
      </div>
      <Opportunity />
      <NewGames />
      <You2Recommendations />
      <DailyJackpots />
      <GameProviders />
    </>
  );
};
