import Hero from "../components/Hero";
import HotelDisplayGrid from "../components/HotelsDisplayGrid";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto">
        <Hero />
        <HotelDisplayGrid />
      </div>
    </>
  );
};

export default HomePage;
