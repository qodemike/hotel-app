import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInFormData } from "../components/SignIn/SignIn";
import APICLIENT from "../services/api-client";
import { toast } from "@/components/ui/use-toast";

const apiClient = new APICLIENT();

const useSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInFormData) =>
      apiClient.create<SignInFormData>(data, "/api/auth/login"),

    onSuccess: async () => {
      toast({
        variant: "default",
        title: "Signed In!",
        description: "Sign in was successful!"
      })
      await queryClient.invalidateQueries("userPayload");
      navigate(location.state?.from?.pathname || "/");
    },

    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Sign In Failed!",
        description: "Failed to Sign In!"
      })
    },
  });
};

export default useSignin;
