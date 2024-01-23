import { ReactNode, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import AppContext from "./AppContext";
import { ToastMessage } from "../components/Toast";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise =  loadStripe(STRIPE_PUB_KEY);

interface Props {
  children: ReactNode;
}

const apiClient = new APICLIENT();

export const AppContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => apiClient.get("/api/auth/validate-token"),
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        stripePromise,
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
