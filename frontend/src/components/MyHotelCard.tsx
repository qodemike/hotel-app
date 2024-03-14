import { HotelType } from "../../../backend/entities";
import { BiMoney, BiHotel, BiStar, BiEdit } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { TfiTrash } from "react-icons/tfi";
import { Link } from "react-router-dom";
import QueryHotel from "../hooks/useMyHotels";
import {Button} from "../../@/components/ui/button";
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
} from "../../@/components/ui/alert-dialog";


const queryHotel = new QueryHotel();

interface Props {
  hotel: HotelType;
}

const MyHotelCard = ({ hotel }: Props) => {
  const { mutate, isLoading: isDeleting } = queryHotel.deleteHotelById();
  return (
    <div>
      <div
        key={hotel._id}
        className="  bg-card rounded-lg overflow-hidden shadow-lg flex flex-col justify-between gap-6"
      >
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
          <img
            src={hotel.imageUrls[0]}
            className=" w-full h-[300px] lg:rounded-b-lg object-cover "
            alt=""
          />
          <div className=" px-6 lg:px-0 lg:pr-10 self-center">
            <h2 className="text-2xl font-bold mb-4  ">{hotel.name}</h2>
            <div className="whitespace-pre-line  ">
              {hotel.description.substring(0, 300) + "..."}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 flex flex-col gap-5">
          <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="p-3 border-2 border-gray-400 rounded-sm  font-medium flex items-center ">
              <FaLocationDot className="mr-1" />
              {hotel.city}, {hotel.country}
            </div>
            <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
              <BsBuilding className="mr-1" />
              {hotel.type}
            </div>
            <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
              <BiMoney className="mr-1" />${hotel.pricePerNight} per night
            </div>
            <div className="border-2 border-gray-400 rounded-sm p-3 font-medium flex items-center">
              <BiHotel className="mr-1" />
              {hotel.adultCount} adults, {hotel.childCount} children
            </div>
            <div className="border-2 border-gray-400 rounded-sm p-3 font-medium  flex items-center">
              <BiStar className="mr-1" />
              {hotel.starRating} Star Rating
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-3">
            <Link to={`/edit-my-hotel/${hotel._id}`}>
              <Button className="w-full lg:w-fit rounded flex justify-center items-center gap-1">
                <BiEdit size={20} /> Edit Details
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  disabled={isDeleting}
                  variant={"destructive"}
                  className="flex justify-center items-center gap-1"
                >
                <TfiTrash size={20} />
                  Delete Issue
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this issue? This action is
                    irreversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutate(hotel._id)}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* <button
              onClick={() => mutate(hotel._id)}
              className="py-3 px-5 text-xs  font-bold hover:text-white hover:bg-red-600 border border-neutral-500 hover:border-red-600   rounded  flex justify-center items-center gap-2  "
            >
              <TfiTrash size={20} />
              DELETE HOTEL
            </button> */}
          </div>
        </div>
      </div>
      <div className="my-7 border-b border-slate-300"></div>
    </div>
  );
};

export default MyHotelCard;
