import banner1 from "../../assets/banner_1.webp";
import banner1tablet from "../../assets/banner_1_tablet.webp";
import banner1mobile from "../../assets/banner_1_mobile.webp";
import style from "./Hero.module.css";

const Hero = () => {
  return (
    <div className=" ">
      <div className={style.imgWrapper}>
        <picture>
          <source media="(max-width: 500px)" srcSet={banner1mobile} />
          <source media="(max-width: 1024px)" srcSet={banner1tablet} />
          <img src={banner1} alt="" className="w-screen  object-cover" />
        </picture>

        <div className="absolute top-[32%]  lg:top-[18%] mx-5  md:mx-24 lg:mx-40   ">
          <div className=" grid lg:grid-cols-[2fr_1fr] lg:justify-items-end ">
            <div className="mb-8 self-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">
                Find Stays & Feel at Home 
              </h1>
              <p className="mt-8 text-sm md:text-base text-white ">
                Welcome to our hotel booking platform, where your travel
                experience becomes easier and more enjoyable.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex lg:flex-col gap-5 md:gap-20">
              <div>
                <p className="text-3xl md:text-4xl font-medium text-white">
                  12k+
                </p>
                <p className=" text-xs md:text-sm text-white whitespace-nowrap ">
                  Satisfied Visitors
                </p>
              </div>
              <div>
                <p className=" text-3xl md:text-4xl font-medium text-white">
                  4.5k+
                </p>
                <p className=" text-xs md:text-sm text-white whitespace-nowrap">
                  Amazing Tours
                </p>
              </div>
              <div>
                <p className=" text-3xl md:text-4xl font-medium text-white">
                  2k+
                </p>
                <p className=" text-xs md:text-sm text-white whitespace-nowrap">
                  Special Offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
