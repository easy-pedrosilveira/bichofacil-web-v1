import { IContextAuth } from "interfaces";
import { apiAuth } from "providers";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<IContextAuth>({} as IContextAuth);

export function AuthProvider(props: any) {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

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
          } else {
            throw new Error("Token inválido, faça o login para prosseguir!");
          }
        })
        .catch((error) => {
          if (error.response) {
            const message = error.response.data.detail;
            toast.error(message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  
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
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
    }}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContext;
