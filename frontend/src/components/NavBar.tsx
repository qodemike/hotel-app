import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.svg";

const NavBar = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="fixed bg-primary bg-opacity-70 py-4 px-5 md:px-20 w-screen " style={{zIndex:'5'}}>
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
                className=" px-4 text-xs md:text-md font-light  text-neutral-300 flex items-center hover:text-white   "
                to="/my-bookings"
              >
                MY BOOKINGS
              </Link>
              <Link
                className=" pr-5 text-xs md:text-md  text-neutral-300 hover:text-white flex items-center"
                to="/my-hotels"
              >
                MY HOTELS
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/auth/sign-in"
              className=" py-3 px-7 border-2 border-solid border-neutral-300 rounded text-sm  text-neutral-300  flex items-center  hover:text-black hover:bg-neutral-200"
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
