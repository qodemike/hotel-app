import Hero from "../components/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import Showcase from "../components/Showcase";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Hero />
        <SearchBar/>
        <Showcase/>
        <HotelDisplayGrid />
      </div>
    </>
  );
};

export default HomePage;
