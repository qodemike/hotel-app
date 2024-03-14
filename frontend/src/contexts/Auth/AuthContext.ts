import { createContext, useContext } from "react";

interface AuthContextType{
    isAuthenticated: Boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthContext;
