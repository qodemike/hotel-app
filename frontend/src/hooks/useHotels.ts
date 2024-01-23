import { useQuery } from "react-query";
import APICLIENT from "../services/api-client";
import { HotelType } from "../../../backend/src/entities";

const apiClient = new APICLIENT();

const  useHotels = () => {
    return useQuery({
        queryKey: ['Hotels'],
        queryFn: () => apiClient.get<HotelType[]>("/api/hotels"),
    })
}

export default useHotels;