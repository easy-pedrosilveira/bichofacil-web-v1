import { createContext, useContext, useState } from "react";
import { IBuyCredits } from "interfaces";

interface BuyCreditsData {
  deposit: {
    value: number;
  };
}

export const BuyCreditsContext = createContext<IBuyCredits>({} as IBuyCredits);

export const BuyCreditsProvider = ({ children }: any) => {
  const [page, setPage] = useState(0);
  const [buyCreditsData, setBuyCreditsData] = useState<BuyCreditsData>({
    deposit: {
      value: 0,
    },
  });

  const handleDepositData = (value: number) => {
    setBuyCreditsData({
      ...buyCreditsData,
      deposit: { value },
    });
  };

  const nextStep = () => {
    setPage(page + 1);
  };

  const prevStep = () => {
    setPage(page - 1);
  };

  const resetBuyCreditsData = () => {
    setPage(0);
    setBuyCreditsData({
      deposit: {
        value: 0,
      },
    });
  };

  return (
    <BuyCreditsContext.Provider
      value={{
        page,
        handleDepositData,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </BuyCreditsContext.Provider>
  );
};
