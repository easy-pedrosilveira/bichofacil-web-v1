import { createContext, useContext, useState } from "react";
import { IBuyCredits, InfoBuyCredits } from "interfaces";
import { apiAuth } from "providers";

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
  const [openBuyCredits, setOpenBuyCredits] = useState(false);
  const [infoBuyCredits, setInfoBuyCredits] = useState<InfoBuyCredits | null>(
    null
  );
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

  const handleOpenModalBuyCredits = (bool: boolean) => {
    setOpenBuyCredits(bool);
    getInfoBuyCredits();
  };

  const getInfoBuyCredits = async () => {
    try {
      const response = await apiAuth.get("/info-buy-credits/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data)
        setInfoBuyCredits(data);
      } else {
        console.log("Erro ao obter dados da API:", response.status);
      }
    } catch (error) {
      console.error("Erro na requisição da API:");
    }
  };

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
        handleOpenModalBuyCredits,
        handleDepositData,
        handleMethodData,
        nextStep,
        prevStep,
        openBuyCredits,
        infoBuyCredits,
        page,
        depositValue,
        typePayment,
      }}
    >
      {children}
    </BuyCreditsContext.Provider>
  );
};
