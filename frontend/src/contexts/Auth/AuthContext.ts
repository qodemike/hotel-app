import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface UserPayload {
  userId: string;
}

interface AuthContextType {
  user: UserPayload | null;
  setUser: Dispatch<SetStateAction<UserPayload | null>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
