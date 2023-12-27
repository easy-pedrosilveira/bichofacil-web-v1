import {
  IContextAuth,
  IExtractsUser,
  IResponseLogin,
  IUserAuth,
  IMessagesUser,
  IPixKeyUser,
  ITicketsUser,
  IPurchase,
} from "interfaces";
import { apiAuth } from "providers";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext<IContextAuth>({} as IContextAuth);

export function AuthProvider(props: any) {
  const navigate = useNavigate();

  const [errorHandlingInitialized, setErrorHandlingInitialized] =
    useState(false);
  const [errorShown, setErrorShown] = useState(false);

  // abertura e fechamento do modal de login
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // armazenamento do token e o dos dados do usuario atual
  const [user, setUser] = useState<IUserAuth>();
  // console.log("TOKEN ============>", localStorage.getItem("token"));
  // console.log("USER ============>", user);

  //informações do usuário
  const [tickets, setTickets] = useState<ITicketsUser>();
  const [messages, setMessages] = useState<IMessagesUser>();
  const [purchase, setPurchase] = useState<IPurchase>({
    Payment_info: "",
    qrcode: "",
    payment_type: "",
    user: "",
    qrcode_text: "",
  });
  const [pixKey, setPixKey] = useState<IPixKeyUser>();
  const [extracts, setExtracts] = useState<IExtractsUser>();
  const [credits, setCredits] = useState(0);
  const [winning, setWinning] = useState(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  //variavel de controle para fazer a requisição de usuário
  const [refresh, setRefresh] = useState<boolean>(false);

  // checando se o usuário está logado
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  //funções para manipular email e senha do usuario
  const [bodyLogin, setBodyLogin] = useState({
    email: "",
    password: "",
  });
  const handleEmailChange = (e: any) => {
    setBodyLogin((prev: any) => ({ ...prev, email: e.target.value }));
  };
  const handlePasswordChange = (e: any) => {
    setBodyLogin((prev: any) => ({ ...prev, password: e.target.value }));
  };

  // função que abre e fecha modal de login
  const handleOpenModalLogin = (bool: boolean) => {
    setShowModal(bool);
  };
  //função que busca o usuario no DB através do email
  const getUserByToken = async () => {
    try {
      const response = await fetch("http://54.76.180.109/api/v2/user/", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
      setUserExists(true);
      setCredits(parseFloat(userData.credits_balance));
      setWinning(parseFloat(userData.winner_balance));
      setExtracts(userData.extracts);
      setMessages(userData.messages);
      setTickets(userData.tickets);
      setPixKey(userData.pix_key);
      handleOpenModalLogin(true);

      if (response.status === 200) {
        setUserExists(true);
      } else {
        toast.error("Faça login novamente!");
        setUserExists(false);
        localStorage.removeItem("token");
        setShowModal(true);
      }

      return response;
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null && !userExists) {
      getUserByToken();
    }
  }, [localStorage.getItem("token"), userExists]);

  useEffect(() => {
    if (userExists) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  const refreshUser = (refresh: boolean) => {
    if (refresh) {
      getUserByToken();
      setRefresh(false);
    }
  };

  //função que envia dados para o back end e valida.
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true); // Ativar o indicador de loading

      await apiAuth
        .post("/user/token/obtain/", bodyLogin)
        .then(async (res) => {
          if (res.status === 200) {
            const access_token = res?.data?.access;
            // Armazenar o token no localStorage
            localStorage.setItem("token", access_token);
            await getUserByToken();
          } else {
            throw new Error("Token inválido, faça o login para prosseguir!");
          }
        })
        .catch((error) => {
          if (error.response) {
            const message = error.response.data.detail;
            toast.error(message);
          } else if (error.code === 'ERR_NETWORK') {
            // Timeout ocorreu
            toast.error('A requisição expirou devido a um timeout.');
          }
        })
        .finally(() => {
          setLoading(false); 
        });
    } catch (error) {
      console.log(error);
    }
  };

  //função para encerrar a sessão do usuário
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  };

  // Função para tratar erros de 401(token invalido) e 410(token expirado)
  useEffect(() => {
    if (!errorHandlingInitialized) {
      apiAuth.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 410 && !errorShown) {
              localStorage.removeItem("token");
              toast.error(
                "Seu token está invalido, por favor faça o login novamente!"
              );
              // setShowModal(true);
              setErrorShown(true); // Marque a mensagem como mostrada
            }
          }
          return Promise.reject(error);
        }
      );

      setErrorHandlingInitialized(true);
    }
    apiAuth.interceptors.request.use(
      (config) => {
        // Verifica se o token de autenticação existe
        const token = Cookies.get("token");
        if (token) {
          // Adiciona o token de autenticação ao cabeçalho da requisição
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [errorHandlingInitialized, errorShown]);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocalização não suportada pelo navegador.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [longitude, latitude]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        handleEmailChange,
        handlePasswordChange,
        handleOpenModalLogin,
        refreshUser,
        loading,
        isLogged,
        bodyLogin,
        showModal,
        user,
        credits,
        winning,
        tickets,
        messages,
        pixKey,
        extracts,
        purchase,
        latitude,
        longitude,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
