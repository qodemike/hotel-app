import { useMutation, useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import {
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../../backend/entities";
import { BookingFormData } from "../../../backend/entities/BookingFormData";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const apiClient = new APICLIENT();

class QueryBooking {
  fetchCurrentUser = () => {
    return useQuery({
      queryKey: ["fetchCurrentUser"],
      queryFn: () => apiClient.get<UserType>("/api/users/me"),
    });
  };

  fetchHotelById = (hotelId: string) => {
    return useQuery({
      queryKey: ["fetchHotelById"],
      queryFn: () => apiClient.get<HotelType>("/api/hotels/" + hotelId),
      enabled: !!hotelId,
    });
  };

  createPaymentIntent = (hotelId: string, numberOfNights: number) => {
    return useQuery({
      queryKey: ["paymentIntent"],
      queryFn: async (): Promise<PaymentIntentResponse> => {
        const response = await fetch(
          `${API_BASE_URL}/api/hotels/${hotelId}/create-payment-intent`,
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ numberOfNights }),
          }
        );

        if (!response.ok) throw new Error("Error fetching payment Intent");

        return response.json();
      },
      enabled: !!hotelId && numberOfNights > 0,
    });
  };

  createBooking = () => {

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
          description: "An error occurred while  saving booking!"
        })
      },
    });
  };
}

export default QueryBooking;
