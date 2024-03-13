import { Link } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import QueryHotel from "../hooks/useMyHotels";
import MiniFooter from "../components/MiniFooter";
import { TfiTrash } from "react-icons/tfi";
import { Oval } from "react-loader-spinner";
import { BiEdit } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const queryHotel = new QueryHotel();

const MyHotelsPage = () => {
  const { data: hotelData, isLoading: isFetchingHotels } =
    queryHotel.fetchMyHotels();
  const { mutate } = queryHotel.deleteHotelById();

  return (
    <>
      <section className=" mx-5 md:mx-10 lg:mx-16 ">
        <div className=" flex flex-col md:flex-row justify-between items-center lg:items-end gap-4 md:gap-0">
          <div className="">
            <h1 className="text-3xl font-bold inline">My Hotel Listings</h1>
            <span className="font-md font-bold ml-2 ">
              {`(${hotelData?.length})`}
            </span>
          </div>
          <Link
            to="/add-hotel"
            className="  bg-primary rounded py-2 px-5 text-sm text-white font-bold p-2 hover:bg-neutral-800 flex items-center  self-end"
          >
            <MdOutlinePlaylistAdd className="mr-1" size={26} />
            CREATE A NEW HOTEL
          </Link>
        </div>
        <div className="  mt-3 mb-8 border-b border-slate-300 "></div>

        {isFetchingHotels ? (
          <div
            className=" pt-40 flex justify-center  "
            style={{ height: "calc(100vh - 200px)" }}
          >
            <Oval
              secondaryColor="gray"
              color="black"
              height={"60px"}
              width={""}
            ></Oval>{" "}
          </div>
        ) : hotelData?.length ? (
          <div className=" grid grid-cols-1 ">
            {hotelData?.map((hotel, index) => (
              <div>
                <div
                  key={index}
                  className="  bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-between gap-6"
                >
                  <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <img
                      src={hotel.imageUrls[0]}
                      className=" w-full h-[300px] lg:rounded-b-lg object-cover "
                      alt=""
                    />
                    <div className=" px-6 lg:px-0 lg:pr-10 self-center">
                      <h2 className="text-2xl font-bold mb-4  ">
                        {hotel.name}
                      </h2>
                      <div className="whitespace-pre-line  ">
                        {hotel.description.substring(0, 300) + "..."}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 flex flex-col gap-5">
                    <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                      <div className="p-3 border-2 border-gray-400 rounded-sm  font-medium flex items-center ">
                        <FaLocationDot className="mr-1" />
                        {hotel.city}, {hotel.country}
                      </div>
                      <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
                        <BsBuilding className="mr-1" />
                        {hotel.type}
                      </div>
                      <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
                        <BiMoney className="mr-1" />${hotel.pricePerNight} per
                        night
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
                    <div className="flex flex-col md:flex-row justify-end gap-3">
                      <Link
                        to={`/edit-my-hotel/${hotel._id}`}
                        className="py-3 px-5 bg-primary text-xs text-white font-bold rounded  hover:bg-neutral-800 flex justify-center items-center gap-2"
                      >
                        <BiEdit size={20} /> EDIT DETAILS
                      </Link>
                      <button
                        onClick={() => mutate(hotel._id)}
                        className="py-3 px-5 text-xs  font-bold hover:text-white hover:bg-red-600 border border-neutral-500 hover:border-red-600   rounded  flex justify-center items-center gap-2  "
                      >
                        <TfiTrash size={20} />
                        DELETE HOTEL
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-7 border-b border-slate-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className=" w-full h-full pt-40 flex justify-center  "
            style={{ height: "calc(100vh - 200px)" }}
          >
            <p className="text-2xl font-bold text-neutral-500">
              No Hotels Found
            </p>
          </div>
        )}
      </section>
      <MiniFooter></MiniFooter>
    </>
  );
};

export default MyHotelsPage;
