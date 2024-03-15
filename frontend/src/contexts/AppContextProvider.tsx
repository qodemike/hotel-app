import { ReactNode, useState } from "react";
import Toast from "../components/Toast";
import AppContext from "./AppContext";
import { ToastMessage } from "../components/Toast";


interface Props {
  children: ReactNode;
}


export const AppContextProvider = ({ children }: Props) => {

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        showModal: (value: boolean) =>{  setIsVisible(value) },
      }}
    >
      { isVisible && <div className="  fixed z-30 w-screen h-screen backdrop-grayscale bg-black bg-opacity-50  "></div>}
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
