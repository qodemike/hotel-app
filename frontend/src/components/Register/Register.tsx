import { useForm } from "react-hook-form";
import useRegister from "./useRegister";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const createUser = useRegister();

  const onSubmit = handleSubmit((data) => {
    createUser.mutate(data);
  });

  return (
    <form
      className="flex mt-10 max-w-sm md:max-w-xl m-auto flex-col gap-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl text-gray-900 font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
            {...register("firstName", {
              required: "first name field is required",
            })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
            {...register("lastName", {
              required: "last name field is required",
            })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Enter a password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Please confirm your password";
              } else if (watch("password") !== val) {
                return "Passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-5 font-bold hover:bg-gray-700 "
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
