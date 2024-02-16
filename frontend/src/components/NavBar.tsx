import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import BrandLogo from "../assets/Logo-white.png";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState} from "react";
import useSignOut from "../hooks/useSignOut";

const NavBar = () => {
  const { isLoggedIn, showModal } = useAppContext();
  const navbarRef = useRef<HTMLDivElement>(null);
  const { mutate } = useSignOut();

  const handleSignOut = () => {
    mutate();
  };

  const menu = useRef<HTMLDivElement>({} as HTMLDivElement);

  const handleOpenMenu = () => {
    showModal(true)
    menu.current.style.transform = "translateX(0%)";
  };
  const handleCloseMenu = () => {
    showModal(false)
    menu.current.style.transform = "translateX(100%)";
  };

  let initialScrollPosition = window.scrollY;

  const handleHideOnScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > initialScrollPosition && window.scrollY > 10) {
      if (navbarRef.current)
        navbarRef.current.style.transform = "translateY(-100%)";
    } else {
      if (navbarRef.current)
        navbarRef.current.style.transform = "translateY(0)";
    }

    initialScrollPosition = currentScrollPosition;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHideOnScroll);
    return () => {
      window.removeEventListener("scroll", handleHideOnScroll);
    };
  }, []);

  return (
    <>
    <nav
      ref={navbarRef}
      className={`fixed w-full py-5 px-5 md:px-10 lg:px-16 bg-primary  z-20 flex justify-between items-end transition duration-500  `}
    >
      <div className="flex">
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
          <Link to="footer" className="text-sm hover:text-white ">
            Contact
          </Link>
        </div>
      </div>

      <IoMenuOutline
        onClick={handleOpenMenu}
        size={50}
        className="relative top-2 md:hidden text-neutral-100 cursor-pointer "
      />

      <div
        className={`hidden text-neutral-300 md:flex justify-between items-end `}
      >
        {isLoggedIn ? (
          <div className="flex items-end gap-4 lg:gap-8">
            <Link
              className="  text-xs hover:text-white flex items-center"
              to="/my-bookings"
            >
              MY BOOKINGS
            </Link>
            <Link
              className=" text-xs hover:text-white flex items-center"
              to="/my-hotels"
            >
              MY HOTELS
            </Link>
            <div className="flex">
              <div className=" relative top-1 h-7 mr-5 border-l  border-neutral-100 "></div>
              <button
                onClick={handleSignOut}
                className="relative top-[3px] hover:text-white font-bold"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className=" relative top-1 h-7 mr-5 border-l  border-neutral-100 "></div>
            <Link
              to="/auth/sign-in"
              className=" relative top-[3px] hover:text-white font-bold  "
            >
              Log In
            </Link>
          </>
        )}
      </div>
      
    </nav>


    <div
    ref={menu}
    className={`fixed md:hidden z-40 top-0 right-0 w-[60vw] h-screen p-10 py-20 bg-primary  flex flex-col gap-10 justify-center transition translate-x-full `}
  >
    <IoCloseOutline
      onClick={handleCloseMenu}
      size={40}
      className="absolute top-0 right-0 m-5 text-white cursor-pointer"
    />
    <div className="h-full     text-neutral-300 flex flex-col gap-8 ">
      <Link to="/" className=" text-sm hover:text-white ">
        Home
      </Link>
      <Link to="/search" className="text-sm hover:text-white ">
        Search
      </Link>
      <Link to="footer" className="text-sm hover:text-white ">
        Contact
      </Link>
    </div>
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
        <div className="flex">
          <div className=" relative top-1 h-7 mr-5 border-l  border-neutral-100 "></div>
          <button
            onClick={handleSignOut}
            className="relative top-[3px] text-neutral-300 hover:text-white font-bold"
          >
            Log Out
          </button>
        </div>
      </>
    ) : (
      <div className="flex">
        <div className=" relative -top-1 h-7 mr-5 border-l  border-neutral-100 "></div>
        <Link
          to="/auth/sign-in"
          className="  text-sm text-neutral-300 hover:text-white font-bold"
        >
          Log In
        </Link>
      </div>
    )}
  </div>
  </>
  );
};

export default NavBar;
