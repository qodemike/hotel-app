import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PaymentIntentResponse, UserType } from "../../../backend/entities";
import { useState } from "react";
import { useSearchContext } from "./SearchBar/SearchContext";
import { useParams } from "react-router-dom";
import QueryBooking from "../hooks/useCreateBooking";
import { BookingFormData } from "../../../backend/entities/BookingFormData";

interface Props {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
}

const queryBooking = new QueryBooking();

const CheckoutForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { mutate } = queryBooking.createBooking();

  const formdata: BookingFormData = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    adultCount: search.adultCount,
    childCount: search.childCount,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    hotelId: hotelId as string,
    totalCost: paymentIntent.totalCost,
    paymentIntentId: paymentIntent.paymentIntentId,
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    isLoading;
    setIsLoading(true);

    try {
      const { error: elementsSubmitError } = await elements.submit();

      if (elementsSubmitError) {
        setIsLoading(false);
        return;
      }

      const {
        paymentIntent: PaymentIntentResponse,
      } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentIntent.clientSecret,
        confirmParams: { return_url: "" },
        redirect: "if_required",
      });

      if (PaymentIntentResponse?.status === "succeeded") {
        mutate(formdata);
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl p-4 bg-primary font-inter ">
      <PaymentElement className="" options={{ layout: "tabs" }} />
      <button
        onClick={handleSubmit}
        className=" w-full py-3 mt-3 font-medium  text-white hover:text-black hover:bg-neutral-100 border-2 border-neutral-100 rounded-lg  transition "
      >
        PAY ${paymentIntent.totalCost}
      </button>
    </div>
  );
};

export default CheckoutForm;
