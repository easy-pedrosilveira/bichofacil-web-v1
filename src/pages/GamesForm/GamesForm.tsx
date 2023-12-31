import { IntroBar, ActualGame } from "components";
import useGameContext from "data/hooks/useGameContext";
import { IModalities } from "interfaces";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const GamesForm = () => {
  const location = useLocation();
  const { modalities } = useGameContext();
  const [actualGame, setActualGame] = useState<IModalities>();

  useEffect(() => {
    const masking = location.pathname.split("/");
    const nameGame = masking[masking.length - 1];
    function findGamePerPathName() {
      const gameFound = modalities.find(
        (game) => game?.short_name === nameGame
      );
      setActualGame(gameFound);
    }
    findGamePerPathName();
  }, [modalities, location.pathname]);

  return (
    <>
      <IntroBar
        title={`${actualGame?.name}`}
        paragraph={""}
      />
      {actualGame ? <ActualGame actualModalities={actualGame} /> : null}
    </>
  );
};
