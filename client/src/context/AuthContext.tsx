import { createContext, useContext, useEffect, useState } from "react";
import userApiService from "../services/UserApi";

export interface IAuthState {
  token: string | null;
  authenticated: boolean | null;
}

interface IAuthProps {
  authState?: IAuthState;
  onLogin?: (username: string, password: string) => Promise<any>;
  onRegister?: (
    username: string,
    password: string,
    steamId: string
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
  onProfile?: (token: string) => Promise<any>;
}

const TOKEN_KEY: string | undefined = import.meta.env.VITE_SECRET_KEY;
const AuthContext = createContext<IAuthProps>({});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await localStorage.getItem(TOKEN_KEY as string);
      if (token) {
        setAuthState({ token, authenticated: true });
      }
    };
    loadToken();
  }, []);

  const register = async (
    username: string,
    password: string,
    steamId: string
  ) => {
    try {
      const res = await userApiService.register!({
        username,
        password,
        steamId,
      });
      if (res.token) {
        const { token } = res;
        setAuthState({ token, authenticated: true });
        localStorage.setItem(TOKEN_KEY as string, token);
      }
      return res;
    } catch (err) {
      console.error("Registration error:", err);
      return null;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await userApiService.login!(username, password);
      if (res.token) {
        const { token } = res;
        setAuthState({ token, authenticated: true });
        await localStorage.setItem(TOKEN_KEY as string, token);
      }
      return res;
    } catch (err) {
      console.error("Login error:", err);
      return null;
    }
  };

  const logout = async () => {
    await localStorage.removeItem(TOKEN_KEY as string);
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const getProfile = async (token: string) => {
    if (!token) {
      console.error("Token is missing for getProfile");
      return null;
    }
    try {
      const res = await userApiService.getUser!(token);
      return res;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onProfile: getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
