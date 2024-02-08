import React from "react";
import BrandLogo from "../assets/Logo-white.svg";

const MiniFooter = () => {
  return (
    
    <footer className="py-8 px-5 md:px-10 lg:px-20  text-zinc-500 text-sm  bg-primary flex flex-col md:flex-row md:justify-between gap-7 md:gap-0">
      <div className="flex flex-row items-end  gap-8">
        <img src={BrandLogo} alt="" className=" " />
        <span> @2023 Qode Mike. All rights reserved</span>
      </div>

      <div className="hidden md:flex gap-8 self-center">
        <span>Terms & Conditions</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
};

export default MiniFooter;
