import { Route, Routes } from "react-router-dom";
import {
  Home,
  Register,
  Modalities,
  Profile,
  GamesForm,
  FooterLinks,
  Help,
} from "pages";
import { Header, Error, Footer, PersonalData } from "components";
import useAuthContext from "data/hooks/useAuthContext";

export const Rotas = () => {
  const { isLogged, handleOpenModalLogin } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq/?" element={<FooterLinks />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error />} />
        {isLogged ? (
          <>
            <Route path="/modalities" element={<Modalities />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/games-form/:id" element={<GamesForm />} />
          </>
        ) : null}
      </Routes>
      <Footer />
    </>
  );
};
