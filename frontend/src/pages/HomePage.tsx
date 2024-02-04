import Hero from "../components/Hero/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import Showcase from "../components/Showcase";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Hero />
        <div className="max-w-[1100px] m-auto relative md:top-[-20px] lg:top-[-100px]">
          <SearchBar />
        </div>
        <Showcase />
        <HotelDisplayGrid />
      </div>
    </>
  );
};

export default HomePage;
