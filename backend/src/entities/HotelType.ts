import { BookingType } from "./BookingType";


export interface HotelType {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
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
