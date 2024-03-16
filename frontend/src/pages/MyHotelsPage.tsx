import { Link } from "react-router-dom";
import QueryHotel from "../hooks/useMyHotels";
import MiniFooter from "../components/MiniFooter";
import { Oval } from "react-loader-spinner";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import MyHotelCard from "../components/MyHotelCard";

const queryHotel = new QueryHotel();

const MyHotelsPage = () => {
  const { data: hotelData, isLoading: isFetchingHotels } = queryHotel.fetchMyHotels();

  return (
    <>
      <section className=" mx-5 md:mx-10 lg:mx-16 ">
        <div className=" flex flex-col md:flex-row justify-between items-center lg:items-end gap-4 md:gap-0">
          <div >
            <h1 className="text-3xl font-bold inline">My Hotels</h1>
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
            {hotelData?.map((hotel) => (<MyHotelCard hotel={hotel}/>))}
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
