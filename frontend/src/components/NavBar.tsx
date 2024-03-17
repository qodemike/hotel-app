import { Link } from "react-router-dom";
import BrandLogo from "../assets/HotelApp-black.svg";
import { IoMenuOutline } from "react-icons/io5";
import { useEffect,  useState } from "react";
import useSignOut from "../hooks/useSignOut";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import RightSheet from "./RightSheet";

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
  const [isDisplayingSheet, setIsDisplayingSheet] = useState(false);

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsAtTop(false);
        return;
      }
      setIsAtTop(true);
    });
  }, []);

  const handleSignOut = () => mutate();

  return (
    <>
      <nav
        className={`fixed z-20 w-full py-5 px-6  lg:px-16 bg-background ${
          !isAtTop && "shadow-md"
        }  flex justify-between items-center transition duration-300`}
      >
        <Link to="/" className="">
          <img src={BrandLogo} />
        </Link>

        <IoMenuOutline
          onClick={() => setIsDisplayingSheet(true)}
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
      <RightSheet
        isDisplayingSheet={isDisplayingSheet}
        onSheetDisplay={(isDisplayingSheet) =>
          setIsDisplayingSheet(isDisplayingSheet)
        }
      />
    </>
  );
};

export default NavBar;
