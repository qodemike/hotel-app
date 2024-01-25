import { HotelType } from "./HotelType";

export interface HotelSearchResponse {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
