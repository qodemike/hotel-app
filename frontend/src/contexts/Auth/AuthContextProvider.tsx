import React, { ReactNode, useState } from "react";
import AuthContext from "./AuthContext";
import APICLIENT from "../../services/api-client";
import { useQuery } from "react-query";

interface Props {
  children: ReactNode;
}

const apiClient = new APICLIENT();

const AuthContextProvider = ({ children }: Props) => {
  const [] = useState(false);

  const {  } = useQuery({
    queryKey: ["authToken"],
    queryFn: () => apiClient.get("/api/auth/validate-token"),
  });

  return (
    <AuthContext.Provider value={{ }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
