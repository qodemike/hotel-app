import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/entities";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  hotel: HotelType;
}

const HotelCard = ({ hotel }: Props) => {
  const card = useRef<HTMLDivElement>(null!);
  const [hover, sethover] = useState(false);

  return (
    <Link to={`/detail/${hotel._id}`} className="relative cursor-pointer ">
      <div
        ref={card}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <div className="h-[300px] rounded-lg overflow-hidden before:content-[''] before:bg-black before:w-full before:h-full before: ">
          <img
            src={hotel.imageUrls[0]}
            alt=""
            className={`w-full h-full rounded object-cover `}
          />
          <div
            className={`px-4 py-2 text-white bg-black relative top-[-34%] bg-opacity-70  transition duration-500 ${
              hover ? "translate-y-full" : ""
            } flex flex-col font-poppins gap-2 `}
          >
            <span className=" font-poppins font-medium text-lg">
              {hotel.name}
            </span>
            <div className="flex">
              <FaLocationDot size={12} className="mr-1 mt-[3px]" />
              <span className="text-sm">{hotel.city + ","}</span>
              <span className="text-sm ml-2">{hotel.country}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex mt-1">
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
                {Array.from({ length: 5 - hotel.starRating }).map(
                  (_, index) => (
                    <AiOutlineStar key={index} className="fill-yellow-400" />
                  )
                )}
              </div>
              <div>
                <span className="font-bold font-inter text-sm">
                  ${hotel.pricePerNight}
                </span>
                <span className=" font-inter text-sm"> / Night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
