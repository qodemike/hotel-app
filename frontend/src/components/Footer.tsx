import BrandLogo from "../assets/Logo-white.svg";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoPinterest } from "react-icons/io";

const Footer = () => {
  return (
    <div className="py-10 px-5 md:px-10 lg:px-20 bg-primary ">
      <div className="mb-7 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
       <img src={BrandLogo} alt="" className="h-10"/>

          <div className="  text-zinc-300 flex gap-8 self-center md:self-end">
            <Link to={"#"} className="hover:text-white transition">
              <FaSquareFacebook size={22}/>
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              <FaTwitter size={22}/>
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              <FaInstagram size={22}/>
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              <IoLogoPinterest size={22}/>
            </Link>
          </div>
      </div>

      {/* ====================================================================================== */}

      <div className=" mb-7 border-b border-zinc-500"></div>
      <div className="  text-zinc-500 text-sm flex flex-col items-center md:flex-row md:justify-between gap-7 md:gap-0">
          <span> @2023 Qode Mike. All rights reserved</span>

        <div className=" flex gap-8 self-center  md:self-end">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
