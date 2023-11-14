import { Theme, GlobalStyles } from 'themes';
import { Rotas } from 'routes';
import { AuthProvider } from 'data/context';

export const App = () => {
  return (
    <div>
      <Theme>
        <AuthProvider>
        <GlobalStyles />
        <Rotas />
        </AuthProvider>
      </Theme>
    </div>
  );
}

export default App;
