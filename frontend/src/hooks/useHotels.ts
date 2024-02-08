import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/entities";

const apiClient = new APICLIENT();

interface FetchHotelsResponse {
  data: HotelType[];
  pagination: {
    page: number;
    pages: number;
  };
}

const useHotels = (pageNumber: number) => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", pageNumber.toString());

  return useQuery({
    queryKey: ["Hotels", pageNumber],
    queryFn: () =>
      apiClient.get<FetchHotelsResponse>(`/api/hotels?${queryParams}`),
  });
};

export default useHotels;
