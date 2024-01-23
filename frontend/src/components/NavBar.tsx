import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const NavBar = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="bg-primary py-5">
      <header className=" mx-5 md:mx-10 flex justify-between">
        <span className="text-xl md:text-4xl  font-bold tracking-tight text-white">
          <Link to="/">Hotel App</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="text-sm md:text-md flex items-center text-white px-3 font-bold "
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-sm md:text-md flex items-center text-white px-3 font-bold"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center py-2 px-5 font-bold "
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
