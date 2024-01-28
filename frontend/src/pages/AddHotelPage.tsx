import ManageHotelsForm, { HotelFormData,
} from "../components/ManageHotelForm/ManageHotelsForm";
import QueryHotel from "../hooks/useMyHotels";

const queryHotel = new QueryHotel();

const AddHotelPage = () => {
  const { mutate, isLoading } = queryHotel.createHotel();

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: (data: FormData) => apiClient.create<FormData>(data, '/api/my-hotels'),
  //   onSuccess: () => {
  //     showToast({ message: "Hotel Saved!", type: "SUCCESS" });
  //   },
  //   onError: () => {
  //     showToast({ message: "Error Saving Hotel", type: "ERROR" });
  //   },
  // });

  return (
    <div className="">
    <ManageHotelsForm
      onSave={(hotelFormData: FormData) => {
        mutate(hotelFormData);
      }}
      isLoading={isLoading}
    />
    </div>
  );
};

export default AddHotelPage;
