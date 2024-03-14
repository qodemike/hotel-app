import React, { useContext } from "react";
import { ToastMessage } from "../components/Toast";


interface AppContextType {
  showModal: (value: boolean) => void;
  showToast: (toastMessage: ToastMessage) => void;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
