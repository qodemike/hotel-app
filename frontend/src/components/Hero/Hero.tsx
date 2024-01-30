import banner1 from "../../assets/banner_1.webp";
import banner1tablet from "../../assets/banner_1_tablet.webp";
import banner1mobile from "../../assets/banner_1_mobile.webp";
import style from "./Hero.module.css";

const Hero = () => {


  return (
    <div className="mt-[70px] lg:mt-0 ">
      <div className={style.imgWrapper}>
        <picture>
          <source media="(max-width: 500px)" srcSet={banner1mobile} />
          <source media="(max-width: 1024px)" srcSet={banner1tablet} />
          <img src={banner1} alt="" className="w-screen" />
        </picture>

        <div className="absolute top-[40%] mx-4 md:mx-20 max-w-[1270px] lg:ml-[120px]">
          <h1 className="text-5xl text-white font-bold text-[34px] md:text-[48px]">
            Find your next stay,
          </h1>
          <p className=" text-base md:text-xl  text-white mt-2 ">
            Explore low price hotels for your dream vacation all around the
            world...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
