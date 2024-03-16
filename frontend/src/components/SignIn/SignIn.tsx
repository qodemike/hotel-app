import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignin from "../../hooks/useSignIn";
import googleIcon from "../../assets/google.svg";
import { Oval } from "react-loader-spinner";


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

  const {mutate, isLoading,} = useSignin();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <div className="w-full max-w-xl m-auto  pt-20">
        <form className=" flex flex-col gap-4" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold self-center">Login</h2>
          <div>
            <label className=" text-md font-bold ">Email</label>
            <input
              type="email"
              className=" auth-input "
              placeholder="Enter your email"
              {...register("email", { required: "Enter your email" })}
            ></input>
            {errors.email && (
              <span className={`text-red-500 text-sm`}>{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className="text-black text-md font-bold ">Password</label>

            <input
              type="password"
              className=" auth-input "
              placeholder="Enter your password"
              {...register("password", {
                required: "Enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            ></input>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 mb-3 font-bold text-white text-xl bg-primary  hover:bg-neutral-800 rounded-lg flex justify-center items-center"
            >
              {isLoading ? (
                <Oval
                  secondaryColor="#ECECEC"
                  color="white"
                  height={"30px"}
                  width={"30px"}
                />
              ) : (
                "Login"
              )}
            </button>

          <span className="text-sm font-medium mt-3">
            Not Registered?{" "}
            <Link className="underline font-bold" to="/auth/register">
              Create an account here
            </Link>
          </span>
        </form>

        <button className="w-full mt-8 py-2.5  font-bold border  border-neutral-500 rounded-lg ">
          <img src={googleIcon} alt="google icon" className="inline mr-3" />
          Sign In with Google
        </button>
      </div>
    </>
  );
};

export default SignIn;
