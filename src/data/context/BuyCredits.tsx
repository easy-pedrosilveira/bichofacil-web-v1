import { createContext, useContext, useState } from "react";
import { IBuyCredits } from "interfaces";

interface BuyCreditsData {
  deposit: {
    value: number;
  };
  method: {
    formPayment: string;
  };
}

export const BuyCreditsContext = createContext<IBuyCredits>({} as IBuyCredits);

export const BuyCreditsProvider = ({ children }: any) => {
  const [page, setPage] = useState(0);
  const [buyCreditsData, setBuyCreditsData] = useState<BuyCreditsData>({
    deposit: {
      value: 0,
    },
    method: {
      formPayment: "",
    },
  });
  const [depositValue, setDepositValue] = useState<number>(0);
  const [typePayment, setTypePayment] = useState<string>("");

  const handleDepositData = (value: number) => {
    setBuyCreditsData({
      ...buyCreditsData,
      deposit: { value },
    });
    setDepositValue(value);
  };

  const handleMethodData = (formPayment: string) => {
    setBuyCreditsData({
      ...buyCreditsData,
      method: { formPayment },
    });
    setTypePayment(formPayment);
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
      method: {
        formPayment: "",
      },
    });
  };

  return (
    <BuyCreditsContext.Provider
      value={{
        page,
        handleDepositData,
        depositValue,
        handleMethodData,
        typePayment,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </BuyCreditsContext.Provider>
  );
};
