import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useSearchContext } from "../contexts/search/SearchContext";
import QueryBooking from "../hooks/useCreateBooking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import MiniFooter from "../components/MiniFooter";

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
    <>
      <div className=" min-h-screen max-w-[1300px] m-auto mb-20 ">
        <div className="mx-5 md:mx-6 lg:mx-16 ">
          <h2 className=" mb-5 text-2xl  font-bold text-center  ">
            COMPLETE YOUR BOOKING
          </h2>
          <div className=" grid md:grid-cols-[1.5fr_1fr] gap-5  ">
            <BookingDetailsSummary
              checkIn={search.checkIn}
              checkOut={search.checkOut}
              adultCount={search.adultCount}
              childCount={search.childCount}
              numberOfNights={numberOfNights}
              hotel={hotel}
            />
            <div className=" h-[450px] md:h-full  p-10 border-4 border-slate-200 rounded  bg-white ">
              <div className="flex flex-col ">
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
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
};

export default CreateBookingPage;
