import BrandLogo from "../assets/Logo-white.svg";

const MiniFooter = () => {
  return (
    
    <footer className="py-8 px-5 md:px-10 lg:px-20  text-zinc-500 text-sm  bg-primary flex flex-col md:flex-row md:justify-between gap-7 md:gap-0">
      <div className="flex flex-col md:flex-row items-start md:items-end  gap-4">
        <img src={BrandLogo} alt="" className=" " />
        <span> @2023 Qode Mike. All rights reserved</span>
      </div>

      <div className="flex gap-8  md:self-end">
        <span>Terms & Conditions</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
};

export default MiniFooter;
