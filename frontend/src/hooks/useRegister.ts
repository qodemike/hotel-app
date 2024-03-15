import { RegisterFormData } from "../components/Register/Register";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import APICLIENT from "../services/api-client";
import { toast } from "@/components/ui/use-toast";

const apiClient = new APICLIENT();

const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      apiClient.create<RegisterFormData>(data, "/api/users/register"),

    onSuccess: async () => {
      toast({
        variant: "default",
        title: "New Account Created!",
        description: "A new user was created succesfully!"
      })
      await queryClient.invalidateQueries("userPayload");
      navigate("/");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Registration Failed!",
        description: "An error occured while creating your account!"
      })
    },
  });
};
export default useRegister;
