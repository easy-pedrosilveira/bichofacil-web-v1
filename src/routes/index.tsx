import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages';
import { Navbar, Error } from 'components'

export const Rotas = () => {
  return <main>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </main>
}