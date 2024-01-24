import {  useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../contexts/AppContext";


const API_BASE_URL = import.meta.env.VITE_BASE_URL;


const useSignOut = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  return useMutation( {

    mutationFn: async () => {
       await fetch(`${API_BASE_URL}/api/auth/logout`, {  credentials: "include", method: "POST"})
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast( { message: "Signed Out!", type: "SUCCESS" } );
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
};

export default useSignOut;

