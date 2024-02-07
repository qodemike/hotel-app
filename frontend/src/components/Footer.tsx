import React from "react";
import BrandLogo from "../assets/Logo-white.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-10 px-5 md:px-10 lg:px-20 bg-accent ">
      <div className="mb-5 md:mb-8 flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full max-w-md">
          <span className="text-white font-bold text-xl">
            Subscribe to Our Newsletter
          </span>
          <form className="">
            <input
              type="text"
              placeholder="Email Address"
              className="focus:outline-0 w-full py-3 text-white text-sm bg-accent border-b border-slate-300 "
            />
          </form>
        </div>
        <div className="my-3 md:my-0 text-slate-300  text-sm flex gap-6 self-center md:self-end">
          <Link to={""} className="hover:text-white transition">
            Instagram
          </Link>
          <Link to={""} className="hover:text-white transition">
            Twitter
          </Link>
          <Link to={""} className="hover:text-white transition">
            TikTok
          </Link>
          <Link to={""} className="hover:text-white transition">
            Facebook
          </Link>
        </div>
      </div>

      {/* ====================================================================================== */}

      <div className=" mb-7 border-b border-zinc-500"></div>
      <div className="  text-zinc-500 text-sm flex flex-col md:flex-row md:justify-between gap-7 md:gap-0">

        <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
          <img src={BrandLogo} alt="" className=" " />
          <span> @2023 Qode Mike. All rights reserved</span>
        </div>

        <div className="flex gap-8 self-center  md:self-end">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>

      </div>
    </div>
  );
};

export default Footer;
