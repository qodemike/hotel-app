import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInFormData } from "../components/SignIn/SignIn";
import APICLIENT from "../services/api-client";
import { useAppContext } from "../contexts/AppContext";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const apiClient = new APICLIENT();

const useSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: (data: SignInFormData) =>
      apiClient.create<SignInFormData>(data, "/api/auth/login"),

    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("userPayload");
      navigate(location.state?.from?.pathname || "/");
    },

    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
};

export default useSignin;
