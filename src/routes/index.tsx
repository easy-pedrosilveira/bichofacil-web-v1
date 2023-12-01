import { Route, Routes } from "react-router-dom";
import { Home, Register } from "pages";
import { Header, Error, Footer } from "components";

export const Rotas = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};
