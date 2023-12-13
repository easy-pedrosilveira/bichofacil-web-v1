import { Route, Routes } from "react-router-dom";
import {
  Home,
  Register,
  Modalities,
  Profile,
  GamesForm,
  Help,
  Notifications,
  PolicyPrivacy,
  ResponsibleGaming,
  PolicyAml,
  TermsConditions,
  GameSummary,
} from "pages";
import { Header, Error, Footer, PersonalData } from "components";
import useAuthContext from "data/hooks/useAuthContext";

export const Rotas = () => {
  const { isLogged } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error />} />
        <Route path="/policy-privacy" element={<PolicyPrivacy />} />
        <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
        {/* <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/policy-aml" element={<PolicyAml />} /> */}
        {isLogged ? (
          <>
            <Route path="/modalities" element={<Modalities />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/games-form/:id" element={<GamesForm />} />
            <Route path="/game-summary" element={<GameSummary />} />
            <Route path="/notifications" element={<Notifications />} />
          </>
        ) : null}
      </Routes>
      <Footer />
    </>
  );
};
