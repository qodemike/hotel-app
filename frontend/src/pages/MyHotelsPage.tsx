import { Link } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar,  } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import QueryHotel from "../hooks/useMyHotels";

const queryHotel = new QueryHotel();

const MyHotelsPage = () => {
  const { data: hotelData } = queryHotel.fetchMyHotels();

  if (!hotelData) {}

  return (
    <div className="space-y-5 mt-[100px] mx-10 ">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-3">
        {hotelData?.map((hotel, index) => (
          <div
            key={index}
            data-testid="hotel-card"
            className="flex  flex-col justify-between border border-gray-400 bg-white shadow-lg rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid  grid-cols-2 md:grid-cols-5 gap-2">
              <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                <FaLocationDot className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-my-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white  font-bold p-2 hover:bg-blue-500"
              >
                Edit Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotelsPage;
