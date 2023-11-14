import { useState } from "react";
import useAuthContext from "data/hooks/useAuthContext";

interface ModalLoginProps {
  isOpen: (value: boolean) => void;
}

export const Login = ({ isOpen }: ModalLoginProps) => {
  const { handleEmailChange, handlePasswordChange, handleLogin } = useAuthContext();
  const [open, setOpen] = useState(true);

  return (
    <div
      className="flex fixed w-full h-full bg-black bg-opacity-25 justify-center items-center z-20"
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className=" w-2/5 h-3/5 max-sm:w-4/5 bg-white rounded-lg flex justify-center flex-col items-center">
        <div className="p-5 text-lg font-medium text-center">
          Faça seu Login
        </div>
        <form onSubmit={(e) => handleLogin(e)} className="flex gap-3 justify-center items-center w-3/5 flex-col items-center">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className=" p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Insira seu Email"
            onChange={(e) => handleEmailChange(e)}
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Insira sua Senha"
            autoComplete="current-password"
            required
            onChange={(e) => handlePasswordChange(e)}
            className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
