
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

        <div className=" max-w-[1200px] mt-10 mx-5 md:mx-10 lg:mx-auto px-5 md:px-10 py-10 bg-card shadow-lg ">
          <div className="mb-10">
            <h2 className=" mb-2 text-2xl lg:text-3xl font-medium ">
              Estimate the price
            </h2>
            <p className="text-sm">
              Easily customize your search by entering your location, price and
              dates
            </p>
          </div>
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
