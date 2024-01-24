import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.svg";

const NavBar = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="fixed bg-primary  py-5 px-5 md:px-16 w-screen " style={{zIndex:'5'}}>
      <header className=" flex justify-between items-center">
        <span className="text-xl md:text-4xl  font-bold tracking-tight text-white">
          <Link to="/">
            <img src={BrandLogo} alt="brand logo" />
          </Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link
                className=" text-sm md:text-md flex items-center text-neutral-300 hover:text-white px-4  "
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-sm md:text-md flex items-center text-neutral-300 hover:text-white pr-5 "
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/auth/sign-in"
              className=" flex items-center py-3 px-7 border-2 border-solid border-neutral-300 rounded-md text-sm text-neutral-300 hover:border-white hover:text-white "
            >
              Sign In
            </Link>
          )}
        </span>
      </header>
    </nav>
  );
};

export default NavBar;
