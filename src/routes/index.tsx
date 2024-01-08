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
  ActivationUser,
} from "pages";
import { TermsConditions } from "../pages/TermsConditions/TermsConditions";
import { PolicyAml } from "../pages/PolicyAml/PolicyAml";
import { Header, Error, Footer, PersonalData, Loading } from "components";
import useAuthContext from "data/hooks/useAuthContext";
import useAppContext from "data/hooks/useAppConfig";

export const Rotas = () => {
  const { isLogged } = useAuthContext();
  const { loading } = useAppContext();

  const hiddenHeaderFooter = ![
    "/api/v2/user/activation/:param1/:param2",
    "/api/v2/user/reset-password/confirm/:param1/:param2/",
    "/*",
  ].includes(window.location.pathname);

  return (
    <>
      {loading && <Loading />}
      {hiddenHeaderFooter && (
        <div style={{ position: "relative", height: "95.1px" }}>
          <Header />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {isLogged ? null : <Route path="/register" element={<Register />} />}
        <Route path="help" element={<Help />} />
        <Route path="/*" element={<Error />} />
        <Route path="/policy-privacy" element={<PolicyPrivacy />} />
        <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/policy-aml" element={<PolicyAml />} />
        <Route
          path="/api/v2/user/reset-password/confirm/:param1/:param2/"
          element={<ResetPassword />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/api/v2/user/activation/:param1/:param2"
          element={<ActivationUser />}
        />
        {isLogged ? (
          <>
            <Route path="/modalities" element={<Modalities />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/games-form/:id" element={<GamesForm />} />
            <Route path="/game-summary" element={<GameSummary />} />
            <Route path="/notifications" element={<Notifications />} />
          </>
        ) : (
          <Route path="/*" element={<Error />} />
        )}
      </Routes>
      {hiddenHeaderFooter && <Footer />}
    </>
  );
};
