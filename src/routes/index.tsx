import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Faq, Policy, Terms, Profile } from "pages";
import { Header, Error, Footer, CreditsIcon } from "components";

export const Rotas = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms-conditions" element={<Terms />} />
          <Route path="/policy-privacy" element={<Policy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <CreditsIcon />
        <Footer />
      </BrowserRouter>
    </>
  );
};
