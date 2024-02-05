import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/entities";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import HotelFacility from "./HotelFacility";
import HotelFacilitiesSlider from "./HotelFacilitiesSilder";

interface Props {
  hotel: HotelType;
}

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div>
      <div className="border border-neutral-300 "></div>
      <div className="mb-3 mt-8 grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-2 lg:gap-10">
        <div className="w-full h-[300px]">
          <Link to={`/detail/${hotel._id}`}>
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover rounded"
            />
          </Link>
        </div>
        <div className="pt-2 flex flex-col gap-7">
          <div>
            <div className="flex items-center">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
                {Array.from({ length: 5 - hotel.starRating }).map(
                  (_, index) => (
                    <AiOutlineStar key={index} className="fill-yellow-400" />
                  )
                )}
              </span>
              <span className="ml-1 text-sm">{", " + hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>

          <div>
            <div className="mb-2 text-sm line-clamp-4 ">
              {hotel.description}
            </div>
          </div>
          <div className="cursor-pointer max-w-md ">
            <HotelFacilitiesSlider hotel={hotel} />
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/detail/${hotel._id}`}
              className="h-full max-w-fit py-3 px-5 text-xs text-white font-bold rounded bg-primary hover:bg-neutral-800"
            >
              VIEW DETAIL
            </Link>
            <span className="font-medium">${hotel.pricePerNight} / Night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
