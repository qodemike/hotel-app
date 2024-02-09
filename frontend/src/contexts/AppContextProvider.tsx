import { ReactNode, useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => apiClient.get("/api/auth/validate-token"),
    retry: false,
  });

  useEffect(() => console.log(isVisible), [isVisible])

  return (
    <AppContext.Provider
      value={{
        showModal: (value: boolean) =>{  setIsVisible(value) },
        showToast: (toastMessage) => { setToast(toastMessage)},
        isLoggedIn: !isError,
      }}
    >
      { isVisible && <div className="  w-full h-full bg-black bg-opacity-50 z-20 fixed top-0"></div>}
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
