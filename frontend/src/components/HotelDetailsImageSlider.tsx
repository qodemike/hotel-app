import { Swiper, SwiperSlide } from "swiper/react";
import { HotelType } from "../../../backend/entities";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  hotel: HotelType;
}

const HotelDetailsImageSlider = ({ hotel }: Props) => {
  const [indexOfImageInView , setIndexOfImageInView] = useState(0);

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

  const handleSlideChange = (swiper: SwiperCore) => {
    setIndexOfImageInView(swiper.activeIndex)
  }

  return (
    <div className=" ">
      <Swiper
        onSwiper={(swiper) => ( swiperRef.current = swiper )}
        key="main-slider"
        className="relative"
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {hotel.imageUrls.map((i, index) => (
          <SwiperSlide  key={index}>
            <img
              src={i}
              alt="image of the hotel"
              className="w-full h-[270px]  md:h-[447px] object-cover rounded cursor-grab active:cursor-grabbing"
            />
          </SwiperSlide>
        ))}
          <FaCircleChevronLeft
            onClick={handlePrevSlide}
            size={28}
            className="z-10 absolute top-1/2 -left-2 md:left-2 cursor-pointer text-white text-opacity-70 hover:text-opacity-100 transition"
          />
          <FaCircleChevronRight
            onClick={handleNextSlide}
            size={28}
            className="z-10 absolute top-1/2 -right-2 md:right-2  cursor-pointer text-white text-opacity-70 hover:text-opacity-100 transition"
          />
      </Swiper>
      <div className="mt-4 grid grid-cols-5 gap-2 md:gap-3">
        {hotel.imageUrls.map((url, index) => (
          <div
          key={index}
            onClick={() => handleSlideTo(index)}
            className=" relative rounded overflow-hidden cursor-pointer  "
          >
            <img
              key={index}
              src={url}
              className=" w-full h-[50px] md:h-[100px]  object-cover   cursor-pointer "
            />
            <div className={`z-10 w-full h-full absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition ${ indexOfImageInView == index  ? 'bg-opacity-50' : ''} `}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetailsImageSlider;
