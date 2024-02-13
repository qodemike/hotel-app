import { useParams } from "react-router-dom";
import ManageHotelsForm from "../components/ManageHotelForm/ManageHotelsForm";
import QueryHotel from "../hooks/useMyHotels";
import MiniFooter from "../components/MiniFooter";

const queryHotel = new QueryHotel();

const EditHotelPage = () => {
  const { hotelId } = useParams();
  const { data: hotel } = queryHotel.fetchHotelById(hotelId as string);

  const { mutate, isLoading } = queryHotel.updateHotelById( hotelId as string);

  return (
    <>
    <ManageHotelsForm
      hotel={hotel}
      onSave={(hotelFormData: FormData) => mutate(hotelFormData)}
      isLoading={isLoading}
    />
    <MiniFooter/>
    </>
  );
};

export default EditHotelPage;
