export interface IContextAuth {
    longitude: number,
    latitude: number,
    modalLogin: boolean,
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    logout: () => void;
    setModalLogin: (value: boolean) => void;
    handleLogin: any;
  }

export interface IAppContext {

}

export interface IAppConfig {
  
}