import { useMutation, useQuery, useQueryClient } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/entities";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || '';
const apiClient = new APICLIENT();
const route = "/api/my-hotels/";

class QueryHotel {
  fetchMyHotels = () => {
    return useQuery({
      queryKey: ["MyHotels"],
      queryFn: () => apiClient.get<HotelType[]>(route),
    });
  };

  fetchHotelById = (hotelId: string) => {
    return useQuery({
      queryKey: ["fetchHotelById"],
      queryFn: () => apiClient.get<HotelType>(route + hotelId),
      enabled: !!hotelId,
    });
  };

  createHotel = () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async (data: FormData) => {
        const response = await fetch(API_BASE_URL + route, {
          method: "POST",
          credentials: "include",
          body: data,
        });

        const body = await response.json();

        if (!response.ok) throw new Error(body.message);
      },
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Hotel Saved Successfully!",
          description: "Hotel was saved successfully!"
        })
        navigate('/')
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Hotel Failed to Save!",
          description: "An Error occurred while saving Hotel!"
        })
      },
    });
  };

  updateHotelById = (hotelId: string) => {

    return useMutation({
      mutationFn: async (data: FormData) => {
        const response = await fetch(API_BASE_URL + route + hotelId, {
          method: "PUT",
          credentials: "include",
          body: data,
        });

        const body = await response.json();

        if (!response.ok) throw new Error(body.message);
      } ,
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Hotel Update Successfull!",
          description: "Hotel was updated successfully!"
        })
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Hotel Update Failed!",
          description: "An error occurred while saving update!"
        })
      },
    });
  };

  deleteHotelById = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (hotelId: string) => apiClient.delete(route + `${hotelId}`),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['MyHotels']})
        toast({
          variant: "default",
          title: "Hotel Deleted!",
          description: "Hotel was successfully deleted!"
        })
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to Delete Hotel!",
          description: " An Error occurred while deleting the hotel!"
        })
      },
    });
  };
}

export default QueryHotel;
