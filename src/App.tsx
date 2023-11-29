import { Theme, GlobalStyles } from "themes";
import { Rotas } from "routes";
import { AuthProvider, AppProvider } from "data";

export const App = () => {
  return (
    <div>
      <Theme>
        <AppProvider>
          <AuthProvider>
            <GlobalStyles />
            <Rotas />
          </AuthProvider>
        </AppProvider>
      </Theme>
    </div>
  );
};

export default App;
