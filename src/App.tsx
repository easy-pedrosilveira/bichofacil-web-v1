import { Theme, GlobalStyles } from "themes";
import { Rotas } from "routes";
import { AppProvider, GameProvider, AuthProvider, BetsProvider } from "data/context";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Theme>
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <GameProvider>
                <BetsProvider>
                <Rotas />
                </BetsProvider>
              </GameProvider>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </Theme>
    </div>
  );
};

export default App;
