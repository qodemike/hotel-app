import BrandLogo from "../assets/Logo-white.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-10 px-5 md:px-10 lg:px-20 bg-accent ">
      <div className="mb-8 flex flex-col md:flex-row justify- gap-10 md:gap-20">
        <div className="w-full md:max-w-sm ">
          <span className="text-white font-bold text-xl">
            Subscribe to Our Newsletter
          </span>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your email@gmail.com"
              className="focus:outline-0 w-full py-3 text-white text-sm bg-accent border-b border-slate-400 focus:border-white transition "
            />
            <button className="py-3 px-5 text-white bg-zinc-950 hover:bg-zinc-900 rounded">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex flex-shrink-0 justify-between md:gap-16 lg:gap-28">
          <div className="my-3 md:my-0 text-slate-300  text-sm flex flex-col gap-5  md:self-start">
            <Link to={"#"} className="hover:text-white transition">
              Home
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Search
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Hotels
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              About Us
            </Link>
          </div>
          <div className="my-3 md:my-0 text-slate-300  text-sm flex flex-col gap-5 md:self-start">
            <Link to={"#"} className="hover:text-white transition">
              Find Hotels
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Book Hotels
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              FAQ
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Blog
            </Link>
          </div>

          <div className="my-3 md:my-0 text-slate-300  text-sm flex flex-col gap-5  md:self-start">
            <Link to={"#"} className="hover:text-white transition">
              Instagram
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Twitter
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              TikTok
            </Link>
            <Link to={"#"} className="hover:text-white transition">
              Facebook
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================================== */}

      <div className=" mb-7 border-b border-zinc-500"></div>
      <div className="  text-zinc-500 text-sm flex flex-col md:flex-row md:justify-between gap-7 md:gap-0">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
          <img src={BrandLogo} alt="" className=" " />
          <span> @2023 Qode Mike. All rights reserved</span>
        </div>

        <div className="hidden md:flex gap-8 self-center  md:self-end">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
