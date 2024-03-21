import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HotelType } from "../../../backend/entities";
import dateToString from "../utils/dateToString";

interface BookingsList {
  hotelName: string;
  hotelAddress: string;
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
}

interface Props {
  hotels: HotelType[];
}

const BookingsTable = ({ hotels }: Props) => {
  const bookingsList: BookingsList[] = [];

  hotels.forEach((hotel) =>
    hotel.bookings.forEach((booking) =>
      bookingsList.push({
        hotelName: hotel.name,
        hotelAddress: hotel.address,
        ...booking,
      })
    )
  );

  return (
    <div>
      <Table className=" min-w-[836px] border-b overflow-x-scroll">
        <TableHeader className="font-bold">
          <TableRow className={`bg-accentBg text-white`}>
            <TableCell>Hotel</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Persons</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingsList.map((booking, index) => (
            <TableRow className={`${index % 2 === 0 && "bg-primary/5"}`}>
              <TableCell >
                <span className="font-bold mr-1" >{booking.hotelName},</span>
                {booking.hotelAddress}
              </TableCell>
              <TableCell>{new Date(booking.checkIn).toDateString()}</TableCell>
              <TableCell>{new Date(booking.checkOut).toDateString()}</TableCell>
              <TableCell>{booking.adultCount + booking.childCount}</TableCell>
              <TableCell className="font-bold">$ {booking.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
