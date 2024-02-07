import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useSearchContext } from "../components/SearchBar/SearchContext";
import QueryBooking from "../hooks/useCreateBooking";
import BookingForm from "../components/BookingForm/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const queryBooking = new QueryBooking();
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;
const stripePromise = loadStripe(STRIPE_PUB_KEY);

const CreateBookingPage = () => {
  const search = useSearchContext();

  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.ceil(
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      setNumberOfNights(nights);
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = queryBooking.fetchCurrentUser();

  const { data: hotel } = queryBooking.fetchHotelById(hotelId as string);

  const { data: paymentIntentData } = queryBooking.createPaymentIntent(
    hotelId as string,
    numberOfNights
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className=" mt-[100px]   grid md:grid-cols-[1fr_1fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          options={{
            clientSecret: paymentIntentData.clientSecret,
            appearance: {
              theme: "flat",
              variables: {
                colorText: "",
                fontFamily: "Inter",
              },
            },
          }}
          stripe={stripePromise}
        >
          <CheckoutForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default CreateBookingPage;
