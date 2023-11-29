import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "pages";
import { Header, Error, Footer } from "components";

export const Rotas = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
