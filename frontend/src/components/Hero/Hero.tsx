import Button from "../Button";
import BannerImg from "../../assets/Hero_Image.png"

const Hero = () => {
  return (
    <section className=" h-[calc(100vh-100px)] mx-6 md:mx-10 lg:mx-16 md:grid md:grid-cols-[1fr_1fr] items-center gap-5">
      <div className=" mt-24 space-y-8 ">
          <h1 className="  text-3xl md:text-5xl   font-semibold ">
            Realize affordable stays, explore your dream destinations
          </h1>
          <p className=" max-w-[300px] mt-8 text-sm font-medium">
            Welcome to our hotel booking platform, where your travel experience
            becomes easier and enjoyable.
          </p>
          <Button >
            Explore Hotels
          </Button>
          <button className="bg-primary p"></button>
      </div>

        <picture className="">
          <img src={BannerImg} className=" w-full lg:h-[500px] object-cover  object-top " alt="an image of a hotel" />
        </picture>
    </section>
  );
};

export default Hero;
