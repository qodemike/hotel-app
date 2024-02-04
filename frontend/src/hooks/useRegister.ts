import { RegisterFormData } from "../components/Register/Register";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import APICLIENT from "../services/api-client";
import { useAppContext } from "../contexts/AppContext";

const apiClient = new APICLIENT();

const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      apiClient.create<RegisterFormData>(data, "/api/users/register"),

    onSuccess: async () => {
      showToast({ message: "Registration Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
};
export default useRegister;
