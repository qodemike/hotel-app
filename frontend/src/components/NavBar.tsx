import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.svg";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

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
    <nav
      className="fixed bg-primary bg-opacity-70  py-4 px-5 md:px-10 lg:px-16 w-screen"
      style={{ zIndex: "5" }}
    >
      <header className=" flex justify-between items-center">
        <div className="text-xl md:text-4xl  font-bold tracking-tight text-white">
          <Link to="/">
            <img src={BrandLogo} alt="brand logo" />
          </Link>
        </div>
        <IoMenuOutline
          onClick={handleOpenMenu}
          size={50}
          className=" md:hidden text-white cursor-pointer"
        />
        <div
          ref={menu}
          className={`w-[60vw] h-screen p-8 bg-primary absolute top-0 right-0 flex md:hidden flex-col gap-10 justify-center transition translate-x-full `}
        >
          <IoCloseOutline
            onClick={handleCloseMenu}
            size={50}
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
              className="py-3 px-5  text-sm text-neutral-300 hover:text-black hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-200 rounded transition flex justify-center"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className={`hidden md:flex gap-8`}>
          {isLoggedIn ? (
            <>
              <Link
                className="  text-xs  font-light  text-neutral-300 flex items-center hover:text-white   "
                to="/my-bookings"
              >
                MY BOOKINGS
              </Link>
              <Link
                className=" text-xs   text-neutral-300 hover:text-white flex items-center"
                to="/my-hotels"
              >
                MY HOTELS
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/auth/sign-in"
              className="py-3 px-5  text-sm text-neutral-300 hover:text-black hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-200 rounded transition flex justify-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>
    </nav>
  );
};

export default NavBar;
