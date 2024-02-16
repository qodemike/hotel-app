import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PaymentIntentResponse, UserType } from "../../../backend/entities";
import { useState } from "react";
import { useSearchContext } from "./SearchBar/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import QueryBooking from "../hooks/useCreateBooking";
import { BookingFormData } from "../../../backend/entities/BookingFormData";
import { FaArrowRightLong } from "react-icons/fa6";

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
  const navigate = useNavigate();
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

      const { paymentIntent: PaymentIntentResponse } =
        await stripe.confirmPayment({
          elements,
          clientSecret: paymentIntent.clientSecret,
          confirmParams: { return_url: "" },
          redirect: "if_required",
        });

      if (PaymentIntentResponse?.status === "succeeded") {
        mutate(formdata);
        navigate('/')
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PaymentElement className="min-h-[220px] " options={{ layout: "tabs" }} />
      <button
        onClick={handleSubmit}
        className=" w-full mt-3 p-5 text-white text-sm font-bold bg-primary hover:bg-neutral-800 rounded-lg flex justify-between transition "
      >
        <span>${paymentIntent.totalCost}</span>
        <span className="flex  gap-2 items-center">COMPLETE YOUR BOOKING <div><FaArrowRightLong size={18} /></div> </span>
      </button>
    </>
  );
};

export default CheckoutForm;
