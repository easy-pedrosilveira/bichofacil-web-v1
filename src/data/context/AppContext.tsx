import { createContext, useEffect, useState } from "react";
import { IAppConfig, IAppContext } from "interfaces";
import { IHelps } from "interfaces";
import { apiRouteOpen } from "providers";
import Cookies from "js-cookie";

const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppProvider(props: any) {
  const [appConfig, setAppConfig] = useState({} as IAppConfig);
  const [loading, setLoading] = useState<boolean>(false);
  const [helps, setHelps] = useState<IHelps[]>([]);
  const [initialImgs, setInitialImgs] = useState([]);
  const [profilePanels, setProfilePanels] = useState<number>(0);

  useEffect(() => {
    if (Cookies.get("cookiesAccepted") === "false") {
      Cookies.set("cookiesAccepted", "false", { expires: 30 });
    } else {
      Cookies.set("cookiesAccepted", "true", { expires: 30 });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("carouselVisualized") === "false") {
      Cookies.set("carouselVisualized", "false", { expires: 0 });
    } else {
      Cookies.set("carouselVisualized", "true", { expires: 0 });
    }
  }, []);

  function getConfig() {
    apiRouteOpen.get("/general-settings/").then(function (response) {
      if (response?.data?.allow_game === false) {
        if (typeof window !== "undefined") {
          window.close();
        }
      }
      setInitialImgs(response?.data?.imgs);
      setAppConfig(response?.data);
      setProfilePanels(0);
    });
  }

  function getHelps() {
    setLoading(true);
    apiRouteOpen
      .get("/help/")
      .then(function (response) {
        setHelps(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  useEffect(() => {
    getConfig();
    getHelps();
  }, []);

  return (
    <AppContext.Provider
      value={{
        appConfig,
        loading,
        helps,
        initialImgs,
        profilePanels,
        setProfilePanels,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
