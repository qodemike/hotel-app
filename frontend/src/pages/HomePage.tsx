import Footer from "../components/Footer";
import Hero from "../components/Hero/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import Showcase from "../components/Showcase";

const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="md:px-10 lg:px-16">
          <Hero />
        </div>
        <div className="z-10 max-w-[1100px] m-auto relative mt-7 lg:mt-0 lg:-top-[130px]">
          <SearchBar />
        </div>
        <Showcase />

        <HotelDisplayGrid />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
