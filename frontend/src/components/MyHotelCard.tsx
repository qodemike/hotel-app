import { HotelType } from "../../../backend/entities";
import { BiMoney, BiHotel, BiStar, BiEdit } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { TfiTrash } from "react-icons/tfi";
import { Link } from "react-router-dom";
import QueryHotel from "../hooks/useMyHotels";
import Button from "./Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const queryHotel = new QueryHotel();

interface Props {
  hotel: HotelType;
}

const MyHotelCard = ({ hotel }: Props) => {
  const { mutate, isLoading: isDeletingHotel } = queryHotel.deleteHotelById();

  return (
    <div>
      <div
        key={hotel._id}
        className=" lg:p-5 bg-card rounded overflow-hidden shadow-lg flex flex-col justify-between gap-5"
      >
        <div className="  grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          <img
            src={hotel.imageUrls[0]}
            className=" w-full h-[250px] object-cover "
            alt=""
          />
          <div className=" px-6 lg:px-0 lg:pr-10 self-center">
            <h2 className="text-2xl font-bold mb-4  ">{hotel.name}</h2>
            <div className="whitespace-pre-line text-sm  ">
              {hotel.description.substring(0, 300) + "..."}
            </div>
            
          </div>
        </div>

        <div className="px-5 pb-5 lg:p-0 flex flex-col gap-5">
          <div className=" flex flex-col lg:flex-row justify-between gap-2">
            <div className=" hotel-attribute ">
              <FaLocationDot className="mr-1" />
              {hotel.city}, {hotel.country}
            </div>
            <div className=" hotel-attribute ">
              <BsBuilding className="mr-1" />
              {hotel.type}
            </div>
            <div className=" hotel-attribute ">
              <BiMoney className="mr-1" />${hotel.pricePerNight} per night
            </div>
            <div className=" hotel-attribute ">
              <BiHotel className="mr-1" />
              {hotel.adultCount} adults, {hotel.childCount} children
            </div>
            <div className=" hotel-attribute ">
              <BiStar className="mr-1" />
              {hotel.starRating} Star Rating
            </div>
          </div>

          <div className=" flex flex-col md:flex-row justify-end gap-3">
            <Link to={`/edit-my-hotel/${hotel._id}`}>
              <Button className="w-full lg:w-fit rounded flex justify-center items-center gap-1">
                <BiEdit size={20} /> Edit Hotel
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="w-full bg-red-700 hover:!bg-red-800 rounded  flex justify-center items-center gap-1">
                  <TfiTrash size={20} />
                  Delete Hotel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this listing? This action is
                    irreversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletingHotel}
                    onClick={() => mutate(hotel._id)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="my-7 border-b border-slate-300"></div>
    </div>
  );
};

export default MyHotelCard;
