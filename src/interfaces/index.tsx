export interface IContextAuth {
    longitude: number,
    latitude: number,
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: any;
  }