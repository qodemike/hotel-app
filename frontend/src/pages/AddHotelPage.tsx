import ManageHotelsForm from "../components/ManageHotelForm/ManageHotelsForm";
import MiniFooter from "../components/MiniFooter";
import QueryHotel from "../hooks/useMyHotels";

const queryHotel = new QueryHotel();

const AddHotelPage = () => {
  const { mutate, isLoading } = queryHotel.createHotel();

  return (
    <>
      <div className="  md:mx-6 lg:mx-16 mb-24">
        <ManageHotelsForm
          onSave={(hotelFormData: FormData) => {
            
            for ( const entry of hotelFormData.entries()) console.log(entry)
            mutate(hotelFormData);
          }}
          isLoading={isLoading}
        />
      </div>
      <MiniFooter />
    </>
  );
};

export default AddHotelPage;
