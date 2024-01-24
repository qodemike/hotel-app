import Hero from "../components/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";

const HomePage = () => {
  return (
    <>
      <div className="">
        <Hero />
        <SearchBar/>
        <HotelDisplayGrid />
      </div>
    </>
  );
};

export default HomePage;
