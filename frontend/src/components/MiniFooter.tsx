import BrandLogo from "../assets/Logo-white.png";

const MiniFooter = () => {
  return (
    
    <footer className="py-8 px-5 md:px-10 lg:px-20  bg-primary flex flex-col md:flex-row md:items-end gap-5 ">
        <img src={BrandLogo} alt="" className="w-[120px] object-cover " />

      <div className=" w-full text-zinc-500 text-xs lg:text-sm flex md:justify-between   ">
          <span> @2023 Qode Mike. All rights reserved</span>
        <div className=" flex gap-8 self-center  md:self-end">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default MiniFooter;
