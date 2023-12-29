import { Theme, GlobalStyles } from "themes";
import { Rotas } from "routes";
import {
  AppProvider,
  GameProvider,
  AuthProvider,
  BetsProvider,
  BuyCreditsProvider,
} from "data/context";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <div>
      <Theme>
        <GlobalStyles />
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AuthProvider>
            <AppProvider>
              <BuyCreditsProvider>
                <GameProvider>
                  <BetsProvider>
                    <Rotas />
                  </BetsProvider>
                </GameProvider>
              </BuyCreditsProvider>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </Theme>
    </div>
  );
};

export default App;
