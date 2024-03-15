import { useMutation } from "react-query";
import { BookingFormData } from "../../../backend/entities/BookingFormData";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const useBookingForm = () => {

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
      toast({
        variant: "default",
        title: "Booking Saved Successfully!",
        description: "Booking was saved successfully!"
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Booking Failed to Save!",
        description: "An error occurred while saving booking!"
      })
    },
  });
};

export default useBookingForm;
