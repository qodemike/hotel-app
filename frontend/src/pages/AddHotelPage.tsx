import ManageHotelsForm from "../components/ManageHotelForm/ManageHotelsForm";
import QueryHotel from "../hooks/useMyHotels";

const queryHotel = new QueryHotel();


const AddHotelPage = () => {
  const { mutate, isLoading } = queryHotel.createHotel();


  return (
    <div className="">
    <ManageHotelsForm
      onSave={(hotelFormData: FormData) => { mutate(hotelFormData) ;}}
      isLoading={isLoading}
    />
    </div>
  );
};

export default AddHotelPage;
