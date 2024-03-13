import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/entities";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "./Button";

interface Props {
  hotel: HotelType;
}

const SearchResultsCard = ({ hotel }: Props) => {
  return (
      <div className=" lg:p-3 bg-card drop-shadow-lg grid grid-cols-1 xl:grid-cols-[1fr_1fr]  ">
        <div className="lg:ml-1 w-full h-[250px] self-center">
          <Link to={`/detail/${hotel._id}`}>
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center rounded"
            />
          </Link>
        </div>

        {/* =============================================== */}

        <div className=" m-4  mt-2  lg:ml-10  flex flex-col gap-7 ">
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

          <div className="flex items-center gap-4">
            <Link
              to={`/detail/${hotel._id}`}
            >
              <Button className="rounded">
                View Details
              </Button>
                
            </Link>
            <span className="font-medium">${hotel.pricePerNight} / Night</span>
          </div>
        </div>
      </div>
  );
};

export default SearchResultsCard;
