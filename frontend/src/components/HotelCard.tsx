import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/entities";
import { AiFillStar } from "react-icons/ai";
import { useRef, useState } from "react";

interface Props {
  hotel: HotelType;
}

const HotelCard = ({ hotel }: Props) => {

  const card = useRef<HTMLDivElement>(null);
  const [ hover, sethover]  = useState(false);


    card.current?.addEventListener('mouseover', () =>  sethover(true));
    card.current?.addEventListener('mouseleave', () => sethover(false) );

  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md "
    >
      <div ref={card}>
        <div className="h-[400px] overflow-hidden before:content-[''] before:bg-black before:w-full before:h-full before: ">
          <img
            src={hotel.imageUrls[0]}
            alt=""
            className={`rounded object-cover w-full h-full `}
          />
          <div className={`px-3 py-3 text-white bg-black relative top-[-28%] bg-opacity-50 transition duration-500 ${hover ? 'translate-y-full': '' } flex flex-col font-poppins gap-2 `}>
            <span className="font-bold text-lg">{hotel.name}</span>
            <div>
              <span className="text-sm">{hotel.city}</span>,
              <span className="text-sm ml-2">{hotel.country}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex">
              {Array.from({ length: hotel.starRating }).map((i, index) => (
                <AiFillStar key={index}  className="fill-yellow-400" />
              ))}
              </div>
              <div>
              <span className="font-bold font-inter" >${hotel.pricePerNight}</span>
              <span className=" font-inter"> {' '}/ Night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
