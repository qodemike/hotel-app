import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.svg";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useRef } from "react";

const NavBar = () => {
  const { isLoggedIn } = useAppContext();

  const menu = useRef<HTMLDivElement>({} as HTMLDivElement);

  const handleOpenMenu = () => {
    menu.current.style.transform = "translateX(0%)";
  };
  const handleCloseMenu = () => {
    menu.current.style.transform = "translateX(100%)";
  };

  return (
    <nav className=" fixed w-full py-5 px-5 md:px-10 lg:px-16 bg-primary  z-20  flex justify-between items-end">
      <div className="flex ">
        <Link to="/" className="">
          <img src={BrandLogo} alt="brand logo" />
        </Link>

        <div className="hidden  pl-5 lg:pl-20  text-neutral-300 md:flex items-end gap-3 lg:gap-8 ">
          <Link to="/" className=" text-sm hover:text-white ">
            Home
          </Link>
          <Link to="/search" className="text-sm hover:text-white ">
            Search
          </Link>
          <Link to="/search" className="text-sm hover:text-white ">
            Contact Us
          </Link>
        </div>
      </div>

      <IoMenuOutline
        onClick={handleOpenMenu}
        size={50}
        className="relative top-2 md:hidden text-neutral-100 cursor-pointer "
      />

      <div className={`hidden text-neutral-300 md:flex justify-between items-end `}>
        {isLoggedIn ? (
          <div className="flex items-end gap-4 lg:gap-8">
            <Link className="  text-xs hover:text-white flex items-center" to="/my-bookings">
              MY BOOKINGS
            </Link>
            <Link className=" text-xs hover:text-white flex items-center" to="/my-hotels">
              MY HOTELS
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <>
            <div className=" h-7 mr-7 border-l border-neutral-100 "></div>
            <Link to="/auth/sign-in" className=" relative top-[3px] hover:text-white font-bold  ">
              Log In
            </Link>
          </>
        )}
      </div>

      <div
        ref={menu}
        className={` md:hidden z-20  fixed top-0 right-0  w-[60vw] h-screen p-8 bg-primary shadow-lg flex flex-col gap-10 justify-center transition translate-x-full `}
      >
        <IoCloseOutline
          onClick={handleCloseMenu}
          size={40}
          className="absolute top-0 right-0 m-5 text-white cursor-pointer"
        />
        {isLoggedIn ? (
          <>
            <Link
              className=" text-xs  font-light  text-neutral-300 flex items-center hover:text-white   "
              to="/my-bookings"
            >
              MY BOOKINGS
            </Link>
            <Link
              className=" text-xs text-neutral-300 hover:text-white flex items-center"
              to="/my-hotels"
            >
              MY HOTELS
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link
            to="/auth/sign-in"
            className="py-3 px-5  text-sm text-neutral-300 hover:text-black hover:bg-neutral-100 border border-neutral-300 hover:border-neutral-100 rounded transition flex justify-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
