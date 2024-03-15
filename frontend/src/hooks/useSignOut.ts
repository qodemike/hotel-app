import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const useSignOut = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {setUser} = useAuthContext()

  return useMutation({
    mutationFn: async () => {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
    },
    onSuccess: async () => {
      setUser(null)
      await queryClient.invalidateQueries("userPayload");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
};

export default useSignOut;
