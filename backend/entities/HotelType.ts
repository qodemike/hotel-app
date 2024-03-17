import { BookingType } from "./BookingType";
import { CoordinatesType } from "./CoordinateType";


export interface HotelType {
  _id: string;
  userId: string;
  name: string;
  description: string;
  address: string;
  coordinates: CoordinatesType;
  type: string;
  interface: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
}
