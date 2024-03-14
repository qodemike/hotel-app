import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HotelType } from "../../../backend/entities";

interface Props {
  hotels: HotelType[];
}

const BookingsTable = ({ hotels }: Props) => {
  return (
    <div>
      <Table>
        <TableHeader className="font-bold">
          <TableRow>
            <TableCell>Hotel </TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
            <TableCell>Persons</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{hotel.name}</span>
                  <span className="">{hotel.city+', '+hotel.country}</span>
                </div>
              </TableCell>
              {hotel.bookings.map((booking) => (
                <>
                  <TableCell>
                    {new Date(booking.checkIn).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.checkOut).toDateString()}
                  </TableCell>
                  <TableCell>
                    {booking.adultCount + booking.childCount}
                  </TableCell>
                  <TableCell><span className="font-bold">{"$" + booking.totalCost}</span></TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
