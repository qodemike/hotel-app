import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";
import SearchBar from "../components/SearchBar/SearchBar";
import Showcase from "../components/Showcase";

const HomePage = () => {
  return (
    <>
      <div className="">
          <Hero />
        <div className=" md:mt-10 md:mx-10 lg:mx-16 ">
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
