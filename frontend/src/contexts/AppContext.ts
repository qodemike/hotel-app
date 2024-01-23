import React, { useContext } from "react";
import { ToastMessage } from "../components/Toast";
import { Stripe,  } from "@stripe/stripe-js";



interface AppContextType {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  stripePromise:  Promise<Stripe | null>
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
