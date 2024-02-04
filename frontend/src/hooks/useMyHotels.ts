import { useMutation, useQuery, useQueryClient } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/entities";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
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
    const { showToast } = useAppContext();

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
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel!", type: "ERROR" });
      },
    });
  };

  updateHotelById = <T>(hotelId: string) => {
    const { showToast } = useAppContext();

    return useMutation({
      mutationFn: (data: T) => apiClient.update<T>(data, route + hotelId),
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel!", type: "ERROR" });
      },
    });
  };

  deleteHotelById = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (hotelId: string) => apiClient.delete(route + `${hotelId}`),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['MyHotels']})
        showToast({ message: "Hotel Deleted!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Failed to Delete Hotel!", type: "ERROR" });
      },
    });
  };
}

export default QueryHotel;
