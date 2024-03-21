import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useSignOut from "../hooks/useSignOut";
import { useAuthContext } from "../contexts/Auth/AuthContext";

interface Props {
  onSheetDisplay: (isDisplaySheet: boolean) => void;
  isDisplayingSheet: boolean;
}

const RightSheet = ({onSheetDisplay, isDisplayingSheet} : Props) => {
  const { user } = useAuthContext();
  const { mutate } = useSignOut();

  const menu = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    isDisplayingSheet
    ? (menu.current.style.transform = "translateX(0%)")
    : (menu.current.style.transform = "translateX(100%)");

  }, [isDisplayingSheet])

  const handleCloseSheet = () => {
    onSheetDisplay(false);
  }

  const handleSignOut = () => mutate();

  return (
    <>
      <div
        ref={menu}
        className={`fixed md:hidden z-50 top-0 right-0 w-[60vw] h-screen p-10 py-20 bg-primary  flex flex-col gap-10 justify-center transition translate-x-full `}
      >
        <IoCloseOutline
          onClick={handleCloseSheet}
          size={40}
          className="absolute top-0 right-0 m-5 text-white cursor-pointer"
        />
        <div className="h-full     text-neutral-300 flex flex-col gap-8 ">
          <Link to="/" className=" text-sm hover:text-white ">
            HOME
          </Link>
          <Link to="/search" className="text-sm hover:text-white ">
            SEARCH
          </Link>
          <Link to="footer" className="text-sm hover:text-white ">
            ABOUT
          </Link>
        </div>
        {user ? (
          <>
            <Link
              className=" text-sm  font-light  text-neutral-300 flex items-center hover:text-white   "
              to="/my-bookings"
            >
              MY BOOKINGS
            </Link>
            <Link
              className=" text-sm text-neutral-300 hover:text-white flex items-center"
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

export default RightSheet;
