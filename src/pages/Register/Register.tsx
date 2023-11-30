import { IntroBar, SignUp } from "components";

export const Register = () => {
  return (
    <>
      <IntroBar title={"Criar Nova Conta"} paragraph={"Insira seu dados para se cadastrar"} navigate={"/"} />
      <SignUp />
    </>
  );
};
