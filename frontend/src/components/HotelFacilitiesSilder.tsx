import { HotelType } from "../../../backend/entities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import HotelFacility from "./HotelFacility";

interface Props {
  hotel: HotelType;
}

const HotelFacilitiesSlider = ({ hotel }: Props) => {
  return (
    <Swiper slidesPerGroup={3} freeMode>
      {hotel.facilities.map((facility, index) => (
        <SwiperSlide key={index}>
          <HotelFacility facilityName={facility} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotelFacilitiesSlider;
