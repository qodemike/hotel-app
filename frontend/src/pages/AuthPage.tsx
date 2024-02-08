import { Link, Outlet } from "react-router-dom";
import backgroundImage from "../assets/Auth background Image.webp";
import Logo from "../assets/Logo-black.svg";

export type SignInFormData = {
  email: string;
  password: string;
};

const AuthPage = () => {
  return (
    <>
      <div className="fixed py-5 px-5 md:px-10 bg-secondary w-screen">
        <Link to={"/"}>
          <img src={Logo} alt="brand logo" />
        </Link>
      </div>
      <div className="bg-secondary grid grid-cols-1  lg:grid-cols-2 h-screen ">
        <div className="w-full self-center px-5 md:px-10  ">
          <Outlet />
        </div>
        <div className="hidden lg:flex relative justify-end   ">
          <img
            className="fixed object-cover h-full w-[50vw] "
            src={backgroundImage}
          />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
