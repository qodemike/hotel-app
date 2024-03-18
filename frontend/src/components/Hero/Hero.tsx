import Button from "../Button";
import Hero_Image_Scale_1217 from "../../assets/Hero_Image_scale,w_1217.png";
import Hero_Image_Scale_1018 from "../../assets/Hero_Image_scale,w_1018.png";
import Hero_Image_Scale_726 from "../../assets/Hero_Image_scale,w_726.png";
import Hero_Image_Scale_300 from "../../assets/Hero_Image_scale,w_300.png";

const Hero = () => {
  return (
    <section className="h-fit lg:h-[calc(100vh-100px)] mx-6 md:mx-10 lg:mx-16 grid  grid-cols-1 lg:grid-cols-[1fr_1fr] items-center lg:gap-5">
      <div className=" mt-24 lg:mt-0 space-y-8 ">
        <h1 className="  text-3xl md:text-5xl   font-semibold ">
          Realize affordable stays, explore your dream destinations
        </h1>
        <p className=" max-w-[300px] mt-8 text-sm font-medium">
          Welcome to our hotel booking platform, where your travel experience
          becomes easier and enjoyable.
        </p>
        <Button>Explore Hotels</Button>
        <button className="bg-primary p"></button>
      </div>

      <picture className="h-fit justify-self-center">
        <img
          srcSet={`
              ${Hero_Image_Scale_300} 300w,
              ${Hero_Image_Scale_726} 726w,
              ${Hero_Image_Scale_1018} 1018w,
              ${Hero_Image_Scale_1217} 1217w,
              `}
          src={Hero_Image_Scale_1217}
          className=" md:h-[500px]  object-cover "
          alt="An image of a hotel"
        />
      </picture>
    </section>
  );
};

export default Hero;
