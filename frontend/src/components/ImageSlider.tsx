import { Swiper, SwiperSlide } from "swiper/react";
import { HotelType } from "../../../backend/entities";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRef } from "react";
import SwiperCore from "swiper";
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  hotel: HotelType;
}

const ImageSlider = ({ hotel }: Props) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const handleNextSlide = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const handlePrevSlide = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleSlideTo = (index: number) => {
    if (swiperRef.current) swiperRef.current.slideTo(index);
  };

  return (
    <div className=" ">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        key="main-slider"
        className="relative"
      >
        {hotel.imageUrls.map((i, index) => (
          <SwiperSlide key={index}>
            <img
              src={i}
              alt="image of the hotel"
              className="w-full h-[270px]  md:h-[447px] object-cover rounded cursor-grab active:cursor-grabbing"
            />
          </SwiperSlide>
        ))}
        <IoChevronBack
          onClick={handlePrevSlide}
          size={40}
          className="z-10  absolute top-1/2 -left-2 md:left-2 cursor-pointer text-white"
        />
        <IoChevronForward
          onClick={handleNextSlide}
          size={40}
          className="z-10 absolute top-1/2 -right-2 md:right-2  cursor-pointer text-white"
        />
      </Swiper>
      <div className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
        {hotel.imageUrls.map((url, index) => (
          <div
            onClick={() => handleSlideTo(index)}
            className=" relative rounded overflow-hidden cursor-pointer"
          >
            <img
              key={index}
              src={url}
              className=" w-full h-[50px] md:h-[100px]  object-cover   cursor-pointer "
            />
            <div className="z-10 w-full h-full absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30  "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
