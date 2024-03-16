import { Link } from "react-router-dom";
import BrandLogo from "../assets/Logo-black.png";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import useSignOut from "../hooks/useSignOut";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const NavBar = () => {
  const links = [
    { name: "HOME", href: "/" },
    { name: "SEARCH", href: "/search" },
    { name: "ABOUT", href: "#" },
  ];

  const protectedlinks = [
    { name: "MY BOOKINGS", href: "/my-bookings" },
    { name: "MY HOTELS", href: "/my-hotels" },
  ];

  const { user } = useAuthContext();
  const { mutate } = useSignOut();

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsAtTop(false)
        return
      };
      setIsAtTop(true);
    });
  }, []);

  const handleSignOut = () => mutate();

  const menu = useRef<HTMLDivElement>({} as HTMLDivElement);

  const handleOpenMenu = () => {
    menu.current.style.transform = "translateX(0%)";
  };
  const handleCloseMenu = () => {
    menu.current.style.transform = "translateX(100%)";
  };

  return (
    <>
      <nav
        className={`fixed z-20 w-full py-5 px-6  lg:px-16 bg-background ${!isAtTop && "shadow-md"}  flex justify-between items-center transition duration-300`}
      >
        <div className="flex">
          <Link to="/" className="">
            <img src={BrandLogo} className=" object-cover" alt="brand logo" />
          </Link>
        </div>

        <IoMenuOutline
          onClick={handleOpenMenu}
          size={50}
          className=" md:hidden text-primary cursor-pointer "
        />

        <div className={`hidden  md:flex  items-end gap-8`}>
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-xs transition-all duration-100 `}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="  flex items-end gap-4 lg:gap-8">
              {protectedlinks.map((link) => (
                <Link
                  key={link.name}
                  className={` text-xs  flex md:flex-col items-center `}
                  to={link.href}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-end">
                <div className=" h-7 mr-5 border-l border-black "></div>
                <button onClick={handleSignOut} className=" font-bold ">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-end">
              <div className="  h-7 mr-5 border-l  border-black "></div>
              <Link to="/auth/sign-in" className=" font-bold  ">
                Log In
              </Link>
            </div>
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
        {user ? (
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
