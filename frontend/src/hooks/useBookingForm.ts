import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { BookingFormData } from "../../../backend/entities/BookingFormData";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const useBookingForm = () => {
  const { showToast } = useAppContext();

  return useMutation({
    mutationFn: async (formData: BookingFormData) => {
      const response = await fetch(
        `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error booking room");
      }
    },
    onSuccess: () => {
      showToast({ message: "Booking Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving booking", type: "ERROR" });
    },
  });
};

export default useBookingForm;
