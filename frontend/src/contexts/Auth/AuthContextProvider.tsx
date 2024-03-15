import { ReactNode, useEffect, useState } from "react";
import AuthContext, { UserPayload } from "./AuthContext";
import { useQuery } from "react-query";
import APICLIENT from "../../services/api-client";

const apiClient = new APICLIENT();

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserPayload | null>(null);

  useQuery({
    queryKey: ["userPayload"],
    queryFn: () => apiClient.get("/api/auth/validate-token").then((data) => {setUser(data as UserPayload)} ),
    retry: false
  });

  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
