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
  GameSummary,
  ResetPassword,
} from "pages";
import { TermsConditions } from "../pages/TermsConditions/TermsConditions";
import { PolicyAml } from "../pages/PolicyAml/PolicyAml";
import { Header, Error, Footer, PersonalData } from "components";
import useAuthContext from "data/hooks/useAuthContext";

export const Rotas = () => {
  const { isLogged } = useAuthContext();
  return (
    <>
      <div style={{ position: "relative", height: "99px"}}>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Error />} />
        <Route path="/policy-privacy" element={<PolicyPrivacy />} />
        <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/policy-aml" element={<PolicyAml />} />
        <Route
          path="/api/v2/user/reset-password/confirm/:param1/:param2/"
          element={<ResetPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        {isLogged ? (
          <>
            <Route path="/modalities" element={<Modalities />} />
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
