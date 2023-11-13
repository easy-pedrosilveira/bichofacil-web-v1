import { Theme, GlobalStyles } from 'themes';
import { Rotas } from 'routes';

export const App = () => {
  return (
    <div>
      <Theme>
        <GlobalStyles />
        <Rotas />
      </Theme>
    </div>
  );
}

export default App;
