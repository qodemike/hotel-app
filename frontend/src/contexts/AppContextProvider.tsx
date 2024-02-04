import { ReactNode, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import AppContext from "./AppContext";
import { ToastMessage } from "../components/Toast";


interface Props {
  children: ReactNode;
}

const apiClient = new APICLIENT();

export const AppContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => apiClient.get("/api/auth/validate-token"),
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => { setToast(toastMessage);},
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          closeToast={ () => setToast(null)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
