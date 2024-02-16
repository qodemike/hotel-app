import { HotelType } from "../../../backend/entities";

interface Props {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
}

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div>
      <div className=" rounded-lg  shadow-lg overflow-hidden">
        <img
          src={hotel.imageUrls[0]}
          alt=""
          className="w-full  md:h-44 lg:h-64 object-cover"
        />

        <div className="bg-white px-5 lg:px-7 pt-2 pb-8 flex flex-col gap-6">
          <div className=" border-b py-2">
            <p className="mb-1">Hotel Details: </p>
            <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
          </div>
          <div className="flex gap-10 lg:gap-52">
            <div>
              Check-in
              <div className="font-bold"> {checkIn.toDateString()}</div>
            </div>
            <div>
              Check-out
              <div className="font-bold"> {checkOut.toDateString()}</div>
            </div>
          </div>
          <div className="border-t border-b py-3">
            Total length of stay:
            <div className="font-bold">{numberOfNights} nights</div>
          </div>

          <div>
            Guests{" "}
            <div className="font-bold">
              {adultCount} adults & {childCount} children
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
