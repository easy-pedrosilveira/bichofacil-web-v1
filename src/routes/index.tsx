import { Route, Routes } from "react-router-dom";
import { Home, Register, Modalities, Profile, GamesForm } from "pages";
import { Header, Error, Footer } from "components";
import useAuthContext from "data/hooks/useAuthContext";

export const Rotas = () => {
  const { isLogged, handleOpenModalLogin } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/modalities" element={<Modalities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games-form/:id" element={<GamesForm />} />
        {isLogged ? (
          <>
            {/* <Route path="/modalities" element={<Modalities />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/games-form/:id" element={<GamesForm />} /> */}
          </>
        ) : null}
      </Routes>
      <Footer />
    </>
  );
};
