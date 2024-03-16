import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_API;

const useSignOut = () => {
  const queryClient = useQueryClient();
  const {setUser} = useAuthContext()

  return useMutation({
    mutationFn: async () => {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
    },
    onSuccess: async () => {
      toast({
        variant: "default",
        title: "Signed Out!",
        description: "Sign out was successful"
      })
      setUser(null)
      await queryClient.invalidateQueries("userPayload");
      
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: error.message,
        description: "Failed to Sign Out.Try again!"
      })
    },
  });
};

export default useSignOut;
