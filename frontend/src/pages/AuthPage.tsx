import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/Logo-black.png";

export type SignInFormData = {
  email: string;
  password: string;
};

const AuthPage = () => {
  return (
    <div className="">
      <div className="fixed py-5 px-5 md:px-10 bg-background w-screen">
        <Link to={"/"}>
          <img src={Logo} alt="brand logo" />
        </Link>
      </div>
      <div className="  min-h-screen px-4 py-20 flex justify-center items-center   ">
          <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
