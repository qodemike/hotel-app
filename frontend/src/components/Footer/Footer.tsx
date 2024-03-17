import BrandLogo from "../../assets/HotelApp-white.svg";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoPinterest } from "react-icons/io";

const Footer = () => {
  return (
    <div
      id="footer"
      className="py-6 md:py-10 px-5 md:px-10 lg:px-20 bg-primary "
    >
      <div className="mb-5 flex flex-col md:flex-row justify-between gap-7 md:gap-20">
        <img src={BrandLogo} />

        <div className="  text-zinc-300 flex gap-10 self-center md:self-end">
          <Link to={"#"} className="hover:text-white transition">
            <FaSquareFacebook size={22} />
          </Link>
          <Link to={"#"} className="hover:text-white transition">
            <FaTwitter size={22} />
          </Link>
          <Link to={"#"} className="hover:text-white transition">
            <FaInstagram size={22} />
          </Link>
          <Link to={"#"} className="hover:text-white transition">
            <IoLogoPinterest size={22} />
          </Link>
        </div>
      </div>

      {/* ====================================================================================== */}

      <div className=" mb-7 border-b border-zinc-500"></div>
      <div className="  text-zinc-500 text-xs lg:text-sm flex md:justify-between  ">
        <span> @2024 Qode Mike. All rights reserved</span>

        <div className=" flex gap-8 self-center  md:self-end">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
