import Footer from "../components/Footer";
import Hero from "../components/Hero/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import Showcase from "../components/Showcase";

const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="">
          <Hero />
        </div>
        <div className="">
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
