import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/entities";
import MiniFooter from "../components/MiniFooter";
import { Oval } from "react-loader-spinner";
import BookingsTable from "../components/BookingsTable";

const apiClient = new APICLIENT();

const MyBookingsPage = () => {

  const { data: hotels, isLoading: isFetchingBookings } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: () => apiClient.get<HotelType[]>("/api/my-bookings"),
  });

  return (
    <>
      <div className=" mb-24 mx-5 md:mx-10 lg:mx-16 min-h-screen ">
        <h1 className="mb-4 pb-2 text-3xl font-bold border-b border-slate-300">
          My Bookings
        </h1>

        {isFetchingBookings ? (
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
        ) : hotels?.length ? (
          <div className=" flex flex-col gap-8">
            <BookingsTable hotels={hotels}/>
          </div>
        ) : (
          <div
            className=" w-full h-full pt-40 flex justify-center  "
            style={{ height: "calc(100vh - 200px)" }}
          >
            <p className="text-2xl font-bold text-neutral-500">
              No Bookings Found
            </p>
          </div>
        )}
      </div>
      <MiniFooter></MiniFooter>
    </>
  );
};

export default MyBookingsPage;
