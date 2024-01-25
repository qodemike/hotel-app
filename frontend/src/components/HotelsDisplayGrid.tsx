import useHotels from "../hooks/useHotels";

const HotelDisplayGrid = () => {
  const { data: hotels } = useHotels();

  return (
    <section className="py-[50px]" id="hotel_display_grid">
      <article className="bg-primary py-7 ">
        <div className="max-w-[1200px] mx-5 md:mx-12 lg:mx-auto">
          <h2 className=" text-3xl text-white font-bold">
            Latest Destinations
          </h2>
          <p className="text-white mt-2">
            Explore newly added hotels all around the world with quality facilities.
          </p>
        </div>
      </article>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {hotels?.map((hotel, index) => (
            <div key={index}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelDisplayGrid;
