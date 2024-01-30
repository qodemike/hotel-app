import HotelCard from "./HotelCard";
import useHotels from "../hooks/useHotels";

const HotelDisplayGrid = () => {
  const { data: hotels } = useHotels();

  return (
    <section className="py-[80px]  " id="hotel_display_grid">
      <div className="bg-primary py-8 px-7 md:px-10">
        <article className="text-center">
          <h2 className="text-3xl text-white font-bold ">
            Latest Destinations
          </h2>
          <p className="text-white mt-2">
            Explore newly added hotels all around the world with quality
            facilities.
          </p>
        </article>
      <div className=" max-w-[1100px] mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {hotels?.map((hotel, index) => (
          <div key={index}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
      </div>

    </section>
  );
};

export default HotelDisplayGrid;
