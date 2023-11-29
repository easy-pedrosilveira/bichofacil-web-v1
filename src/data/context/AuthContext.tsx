import { IContextAuth } from "interfaces";
import { apiAuth } from "providers";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<IContextAuth>({} as IContextAuth);

export function AuthProvider(props: any) {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [modalLogin, setModalLogin] = useState<boolean>(false);
  const [modalRegister, setModalRegister] = useState<boolean>(false);
  const [user,setUser] = useState();
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isLogged, setisLogged] = useState<boolean>(true);

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

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();

      await apiAuth
        .post("/user/token/obtain/", bodyLogin)
        .then(async (res) => {
          if (res.status === 200) {
            const access_token = res?.data?.access;
            // Armazenar o token no localStorage
            localStorage.setItem("token", access_token);
            getUserByToken();
          } else {
            throw new Error("Token inválido, faça o login para prosseguir!");
          }
        })
        .catch((error) => {
          if (error.response) {
            const message = error.response.data.detail;
            toast.error(message);
            localStorage.removeItem("token");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
      if (response.status === 200) {
        setUserExists(true);
      } else {
        toast.error("Faça login novamente!");
        setUserExists(false);
        localStorage.removeItem("token");
        setModalLogin(true);
      }
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null && !userExists) {
      getUserByToken();
    }
  }, [localStorage.getItem("token"), userExists]);

  // useEffect(() => {
  //   if (userExists) {
  //     setisLogged(true);
  //   } else {
  //     setisLogged(false);
  //   }
  // }, [user]);

const logout = () => {
  localStorage.removeItem("token");
  setisLogged(false);
}
  
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
    <AuthContext.Provider value={{
        latitude,
        longitude,
        modalLogin,
        modalRegister,
        isLogged,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        logout,
        setModalLogin,
        setModalRegister,
    }}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
