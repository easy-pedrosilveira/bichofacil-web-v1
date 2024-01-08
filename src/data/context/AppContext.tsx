import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppConfig, IHelps } from "interfaces";
import { apiRouteOpen } from "providers";

const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppProvider(props: any) {
  const [appConfig, setAppConfig] = useState({} as IAppConfig);
  const [loading, setLoading] = useState<boolean>(false);
  const [helps, setHelps] = useState<IHelps[]>([]);
  const [profilePanels, setProfilePanels] = useState<number>(0);

  const withLoading = async (asyncFunction: () => Promise<void>) => {
    try {
      setLoading(true);
      // Simula um atraso de 2 segundos antes de fazer a requisição
      await new Promise(resolve => setTimeout(resolve, 2));
      await asyncFunction();
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função que busca a configuração
  const getConfig = () => {
    withLoading(async () => {
      const response = await apiRouteOpen.get("/general-settings/");
      if (response?.data?.allow_game === false) {
        if (typeof window !== "undefined") {
          window.close();
        }
      }
      setAppConfig(response?.data);
      setProfilePanels(0);
    });
  };

  // Função que busca as ajudas
  const getHelps = () => {
    withLoading(async () => {
      const response = await apiRouteOpen.get("/help/");
      setHelps(response?.data);
    });
  };

  // Carrega configuração e ajuda no carregamento inicial
  useEffect(() => {
    getConfig();
    getHelps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        appConfig,
        loading,
        helps,
        profilePanels,
        setProfilePanels,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
