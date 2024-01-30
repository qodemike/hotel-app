import { Link } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import QueryHotel from "../hooks/useMyHotels";
import { IoIosAddCircle } from "react-icons/io";

const queryHotel = new QueryHotel();

const MyHotelsPage = () => {

  const { data: hotelData } = queryHotel.fetchMyHotels();
  const { mutate } = queryHotel.deleteHotelById();

  return (
    <section className="pt-[120px] h-full mx-5 md:mx-10 lg:mx-20 pb-10  ">
      <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-0">
        <div className="self-end">
          <h1 className="text-2xl font-bold inline">Your Hotel Listings</h1>
          <span className="font-md font-bold ml-2 text-neutral-500 ">
            {`(${hotelData?.length})`}{" "}
          </span>
        </div>
        <Link
          to="/add-hotel"
          className=" bg-primary rounded py-3 px-4 text-sm text-white font-bold p-2 hover:bg-neutral-800 self-end flex items-center  "
        >
          <IoIosAddCircle className="mr-2" size={16} />
          CREATE A NEW HOTEL
        </Link>
      </div>
      <div className="border border-neutral-300 my-5"></div>

      {hotelData?.length ? (
        <div className="grid grid-cols-1 gap-10  ">
          {hotelData?.map((hotel, index) => (
            <div
              key={index}
              data-testid="hotel-card"
              className="flex  flex-col justify-between bg-silver border-2 border-gray-400  shadow-lg rounded-lg p-8 gap-5"
            >
              <div className=" grid grid-cols-1 lg:grid-cols-2  gap-6">
                <img
                  src={hotel.imageUrls[0]}
                  className=" object-cover rounded"
                  alt=""
                />
                <div>
                  <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>
                  <div className="whitespace-pre-line">
                    {hotel.description.substring(0, 400) + "..."}
                  </div>
                </div>
              </div>

              <div className="grid  grid-cols-2 lg:grid-cols-5 gap-2">
                <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center ">
                  <FaLocationDot className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
                  <BiMoney className="mr-1" />${hotel.pricePerNight} per night
                </div>
                <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border-2 border-gray-400 rounded-sm p-3 font-medium  flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex justify-end gap-3">
              <Link
                  to={`/edit-my-hotel/${hotel._id}`}
                  className="py-3  px-5 bg-primary text-xs text-white font-bold rounded  hover:bg-neutral-800"
                >
                  EDIT DETAILS
                </Link>
                <button
                onClick={ () => mutate(hotel._id) }
                  className="py-3 px-5 text-xs bg-red-600 text-white font-bold rounded   hover:bg-red-700   "
                >
                  DELETE HOTEL
                </button>
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" w-full h-full flex justify-center  items-center">
          <p className="text-2xl font-bold text-neutral-500">No Hotels Found</p>{" "}
        </div>
      )}
    </section>
  );
};

export default MyHotelsPage;
