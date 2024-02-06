import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import APICLIENT from "../services/api-client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import GuestInfoForm from "../components/GuestInfoForm";
import { HotelType } from "../../../backend/entities";
import { FaLocationDot } from "react-icons/fa6";
import HotelFacility from "../components/HotelFacility";
import ImageSlider from "../components/ImageSlider";

const apiClient = new APICLIENT();

const HotelDetailPage = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => apiClient.get<HotelType>("/api/hotels/" + hotelId || ""),
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="mt-[95px] max-w-[1200px] mx-5 md:mx-10 lg:mx-auto">
      <div>
        <div className="flex mb-2">
          <span className="flex mt-1">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" />
            ))}
            {Array.from({ length: 5 - hotel.starRating }).map((_, index) => (
              <AiOutlineStar key={index} className="fill-yellow-400" />
            ))}
          </span>
          <span>{", " + hotel.type}</span>
        </div>

        <h1 className="text-4xl font-medium font-poppins">{hotel.name}</h1>

        <div className="mt-2  text-neutral-600 flex">
          <FaLocationDot size={15} className=" mt-1 mr-2" />
          <span>{hotel.city}</span>
          <span>{", " + hotel.country}</span>
        </div>
      </div>

      <div className=" mt-3 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-5 ">
        <div className=" flex flex-col gap-8 ">
          <div className="max-w-[780px] ">
            <ImageSlider hotel={hotel} />
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-medium font-poppins">
              Hotel Facilities
            </h2>
            <div className="  flex justify-between flex-wrap  gap-y-7">
              {hotel.facilities.map((facility) => (
                <HotelFacility facilityName={facility} />
              ))}
            </div>
          </div>
          <div>
            <h2 className=" mb-6 text-3xl font-medium font-poppins">
              Description
            </h2>
            <p className="">{hotel.description}</p>
          </div>
        </div>

        <div className="">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
