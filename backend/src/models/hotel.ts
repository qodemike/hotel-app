import mongoose from "mongoose";
import { HotelType } from "../../entities/HotelType";
import { BookingType } from "../../entities/BookingType";
import { bookingSchema } from "./booking";

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    required: true,
  },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true, default: 0 },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
