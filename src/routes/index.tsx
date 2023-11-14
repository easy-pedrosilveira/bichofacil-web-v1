import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages';
import { Header, Error } from 'components'

export const Rotas = () => {
  return <main>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </main>
}