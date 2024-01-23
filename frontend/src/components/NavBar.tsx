import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.svg";

const NavBar = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="bg-primary py-5">
      <header className=" mx-5 md:mx-10 flex justify-between">
        <span className="text-xl md:text-4xl  font-bold tracking-tight text-white">
          <Link to="/">
            <img src={BrandLogo} alt="brand logo" />
          </Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="text-sm md:text-md flex items-center text-neutral-300 hover:text-white px-4  "
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
              className="flex items-center py-3 px-8 border-2 border-solid border-neutral-300 rounded-md text-md text-white hover:bg-white hover:text-black active:bg-neutral-200"
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
