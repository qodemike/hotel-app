import { useForm } from "react-hook-form";
import useRegister from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/google.svg";
import { Oval } from "react-loader-spinner";

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

  const { mutate, isLoading } = useRegister();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <div className="">
        <form className=" flex flex-col gap-5 " onSubmit={onSubmit}>
          <h2 className=" self-center text-3xl  font-bold">
            Create an Account
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            <div>
              <label className=" text-sm font-bold flex-1">
                First Name
              </label>
              <input
                className="w-full h-[43px] px-5 my-1  rounded-lg focus:outline-none"
                placeholder="Enter your first name"
                {...register("firstName", {
                  required: "first name field is required",
                })}
              ></input>
              {errors.firstName && (
                <span className="text-sm text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className=" text-sm font-bold flex-1">
                Last Name
              </label>

              <input
                className="w-full h-[43px] px-5 my-1  rounded-lg focus:outline-none"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "last name field is required",
                })}
              ></input>
              {errors.lastName && (
                <span className="text-sm text-red-500">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div>
            <label className=" text-sm font-bold flex-1">Email</label>

            <input
              type="email"
              className="w-full h-[43px] px-5 my-1  rounded-lg focus:outline-none"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            ></input>
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className=" text-sm font-bold flex-1">
              Password
            </label>

            <input
              type="password"
              className="w-full h-[43px] px-5 my-1  rounded-lg focus:outline-none"
              placeholder="Enter your password"
              {...register("password", {
                required: "Enter a password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            ></input>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div>
            <label className=" text-sm font-bold flex-1 ">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full h-[43px] px-5 my-1  rounded-lg focus:outline-none"
              placeholder="Confirm your password"
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
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <span>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 mb-3 font-bold text-white text-xl  bg-primary  hover:bg-neutral-800 rounded-lg flex justify-center items-center"
            >
              {isLoading ? (
                <Oval
                  secondaryColor="#ECECEC"
                  color="white"
                  height={"30px"}
                  width={"30px"}
                />
              ) : (
                "Create Account"
              )}
            </button>
          </span>


          <span className="text-sm font-medium">
            Already have an accout?{" "}
            <Link className="underline font-bold" to="/auth/sign-in">
              Click here to login
            </Link>
          </span>
          <button className="w-full py-2.5 mt-4 border border-solid border-neutral-500 rounded-lg font-bold ">
            <img src={googleIcon} alt="google icon" className="inline mr-3" />
            Sign In with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
