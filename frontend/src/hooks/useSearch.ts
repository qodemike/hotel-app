import { useQuery } from "react-query";
import { HotelSearchResponse } from "../../../backend/entities";
import APICLIENT from "../services/api-client";

const apiClient = new APICLIENT();

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

const useSearch = (searchParams: SearchParams) => {
  // Create a  query string parameter
  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  return useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () =>
      apiClient.get<HotelSearchResponse>(`/api/hotels/search?${queryParams}`),
  });
};

export default useSearch;
