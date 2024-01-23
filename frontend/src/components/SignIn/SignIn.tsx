import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLogin from "./useSignIn";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const userAuth = useLogin();

  const onSubmit = handleSubmit((data) => {
    userAuth.mutate(data);
  });

  return (
    <form
      className="flex mt-10 max-w-sm md:max-w-xl m-auto flex-col gap-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl text-gray-900 font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-gray-400 rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Enter your email" })}
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
            required: "Enter your password",
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
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-5 font-bold hover:bg-gray-700 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
