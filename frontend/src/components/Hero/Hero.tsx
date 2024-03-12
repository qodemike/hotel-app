import banner1 from "../../assets/banner_1.webp";
import banner1tablet from "../../assets/banner_1_tablet.webp";
import banner1mobile from "../../assets/banner_1_mobile.webp";

const Hero = () => {
  return (
    <section className=" relative md:mt-[90px]  md:rounded-3xl overflow-hidden   ">
      
      <div className=" absolute h-full  md:w-[45%] z-10 p-7 lg:p- md:text-black  bg-opacity-50 md:bg-opacity-90 bg-black md:bg-amber flex flex-col justify-center ">
        <article className="relative lg:-top-10">
          <h1 className="  text-5xl   lg:text-6xl  font-bold ">
            Find Stays & Feel at Home
          </h1>
          <p className="mt-8 text-sm font-medium">
            Welcome to our hotel booking platform, where your travel experience
            becomes easier and more enjoyable.
          </p>
        </article>
      </div>

        <picture className="">
          <source media="(max-width: 500px)" srcSet={banner1mobile} />
          <source media="(max-width: 1024px)" srcSet={banner1tablet} />
          <img
            src={banner1}
            alt="banner image"
            className=" w-full h-[508px] object-bottom object-cover"
          />
        </picture>
    </section>
  );
};

export default Hero;
