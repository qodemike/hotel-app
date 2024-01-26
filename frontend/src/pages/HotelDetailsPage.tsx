import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import APICLIENT from "../services/api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../components/GuestInfoForm";
import { HotelType } from "../../../backend/src/entities";
import { useState } from "react";
import { BsMap } from "react-icons/bs";


const apiClient = new APICLIENT();

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById"],
    queryFn: () => apiClient.get<HotelType>("/api/hotels/" + hotelId || ""),
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="mt-[95px]   max-w-[1370px] mx-5 md:mx-10 lg:mx-auto">
      <div>
        <div className="flex mb-2">
          <span className="flex mt-1">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" />
            ))}
          </span>
          <span>{", " + hotel.type}</span>
        </div>

        <h1 className="text-4xl font-medium font-poppins">{hotel.name}</h1>

        <div className="mt-2 font-medium text-neutral-500">
          <BsMap/>
          <span>{hotel.city}</span>
          <span>{", " + hotel.country}</span>
        </div>
      </div>

      <div className=" mt-2 grid grid-cols-1  lg:grid-cols-[2fr_1fr] gap-7">

        
        <div className="flex flex-col gap-5 ">
          <picture className="  ">
          <img
            src={hotel.imageUrls[0]}
            alt=""
            className="h-[447px] w-full object-cover rounded  "
          />
          </picture>

          <div className="grid grid-cols-5">
            {hotel.imageUrls.map((url, index) => (
              <img key={index} src={url} className=" w-full h-[100px]  rounded object-cover  "/>
            ))}
          </div>

          <p className="my-5">{hotel.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus vitae, fuga voluptates explicabo commodi officia exercitationem quaerat consectetur? Labore aspernatur adipisci quia commodi aliquid dicta, praesentium temporibus quibusdam asperiores hic repellat pariatur nemo, odit ut aut consequuntur tenetur mollitia voluptatibus vel minima natus. Pariatur delectus neque ipsum, architecto odio ratione vel animi placeat? Quia libero voluptates sequi maiores, aliquid, iusto nisi officiis, laboriosam earum doloremque autem perspiciatis delectus! Delectus enim porro, maxime, recusandae facilis libero totam aliquid dolorum nihil eligendi animi incidunt reiciendis earum atque rerum, a officiis consequatur! Nihil obcaecati eius ab corrupti, culpa necessitatibus expedita aliquam nam tempore.</p>

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
