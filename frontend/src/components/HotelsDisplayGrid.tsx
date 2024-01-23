import useHotels from "../hooks/useHotels";


const HotelDisplayGrid = () => {

  const {data: hotels} = useHotels();

  return (
    <div className="space-y-3">
      <h2 className="text-3xl pt-5 text-gray-900 font-bold">
        Latest Destinations
      </h2>
      <p className="text-gray-900">
        Most recent desinations added by our hosts
      </p>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {hotels?.map((hotel, index) => (
            <div key={index}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDisplayGrid;
