import { Route, Routes } from "react-router-dom";
import { Home, Register, Modalities, Profile } from "pages";
import { Header, Error, Footer } from "components";
import useAuthContext from "data/hooks/useAuthContext";

export const Rotas = () => {
  const { isLogged } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/modalities" element={<Modalities />} />
        {isLogged && (
          <>
            {/* <Route path="/modalities" element={<Modalities />} /> */}
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
};
