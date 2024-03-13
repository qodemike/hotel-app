import Button from "../Button";
import BannerImg from "../../assets/joel-filipe-unsplash.jpg"

const Hero = () => {
  return (
    <section className=" h-[calc(100vh-90px)] px-6 md:px-10 lg:px-16 grid md:grid-cols-[1fr_1fr] items-center gap-5">
      <div className=" my-10 space-y-8 ">
          <h1 className="  text-3xl   md:text-5xl   font-semibold ">
            Realize affordable stays, explore your dream destinations
          </h1>
          <p className="mt-8 text-sm font-medium">
            Welcome to our hotel booking platform, where your travel experience
            becomes easier and enjoyable.
          </p>
          <Button >
            Explore Hotels
          </Button>
          <button className="bg-primary p"></button>
      </div>

        <picture className="">
          <img src={BannerImg} alt="an image of a hotel" />
        </picture>
    </section>
  );
};

export default Hero;
