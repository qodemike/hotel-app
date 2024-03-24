import React, { useContext } from "react";


interface AppContextType {
  showModal: (value: boolean) => void;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
