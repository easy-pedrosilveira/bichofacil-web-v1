import { createContext, useEffect, useState } from 'react'
import { IAppContext, IAppConfig } from 'interfaces'
import { apiRouteOpen } from 'providers'

const AppContext = createContext<IAppContext>({} as IAppContext)

export function AppProvider(props: any) {
  const [appConfig, setAppConfig] = useState({} as IAppConfig)
  const [loading, setLoading] = useState<boolean>(false)
  const [profilePanels, setProfilePanels] = useState<number>(0);

  function getConfig() {
    apiRouteOpen.get('/general-settings/').then(function (response) {
      if (response?.data?.allow_game === false) {
        if (typeof window !== 'undefined') {
          window.close()
        }
      }
      setAppConfig(response?.data)
      setProfilePanels(0);
    })
  }

  function getHelps() {
    setLoading(true)
    apiRouteOpen.get('/help/')
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {
        setLoading(false)
      })
  }

  useEffect(() => {
    getConfig()
    getHelps()
  }, [])

  return (
    <AppContext.Provider
      value={{
        appConfig,
        loading,
        profilePanels,
        setProfilePanels,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
