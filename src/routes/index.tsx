import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Help, Policy, Terms } from "pages";
import { Header, Error, Navbar, Footer } from "components";

export const Rotas = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms-conditions" element={<Terms />} />
          <Route path="/policy-privacy" element={<Policy />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
