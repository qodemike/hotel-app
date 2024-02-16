import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/entities";
import MiniFooter from "../components/MiniFooter";
import { FaLocationDot } from "react-icons/fa6";

const apiClient = new APICLIENT();

const MyBookingsPage = () => {
  const { data: hotels } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: () => apiClient.get<HotelType[]>("/api/my-bookings"),
  });

  if (!hotels || hotels.length === 0) return <span> No bookings found </span>;

  return (
    <>
      <div className=" my-[100px] mx-5 md:mx-10 lg:mx-16 ">
        <h1 className="mb-8 pb-2 text-3xl font-bold border-b border-slate-300">
          My Bookings
        </h1>
        <div className=" flex flex-col gap-8">
          {hotels.map((hotel) => (
            <div>
              <div className=" mb-5 bg-white rounded-lg overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-[1fr_2.5fr]  gap-10">
                <img
                  src={hotel.imageUrls[0]}
                  className="w-full h-[230px]   object-cover object-center"
                />

                <div className="py-5 flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                  <div className="text-2xl font-bold">
                    {hotel.name}
                    <div className="text-sm  font-medium text-neutral-600 flex">
                      <FaLocationDot size={15} className=" mr-1" /> {hotel.city}
                      , {hotel.country}
                    </div>
                  </div>
                  {hotel.bookings.map((booking) => (
                    <div>
                      <div>
                        <span className="font-bold mr-2">Dates: </span>
                        <div className="inline">
                          <span>{new Date(booking.checkIn).toDateString()} </span>
                          <span className="font-bold mx-3">-</span>
                          <span>{new Date(booking.checkOut).toDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold mr-2">Guests:</span>
                        <span>
                          {booking.adultCount} adults, {booking.childCount}{" "}
                          children
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-slate-300"></div>
            </div>
          ))}
        </div>
      </div>
      <MiniFooter></MiniFooter>
    </>
  );
};

export default MyBookingsPage;
