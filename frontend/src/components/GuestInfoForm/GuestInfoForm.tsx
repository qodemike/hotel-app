import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchContext } from "../../contexts/search/SearchContext";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

interface Props {
  hotelId: string;
  pricePerNight: number;
}

interface GuestInfoFormData {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [nightsError, setNightsError] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/auth/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    const nights = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    console.log(nights)
    if (nights < 1) {
      setNightsError(true);
      return;
    }

    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <>
      <div className=" p-7 bg-primary rounded  flex flex-col gap-4">
        <div>
          <span className="block mb-1 text-muted ">Price per night</span>
          <span className="text-md font-bold text-white ">
            {"$" + pricePerNight}
          </span>
        </div>

        {/* ===================================================================== */}
        {nightsError && (
          <span
            className={` h-0 text-destructive text-sm transition-all ${
              nightsError && "h-[12px]"
            } `}
          >
            {"Select at least One night of stay"}
          </span>
        )}
        <form
          onSubmit={user ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
        >
          <div className="grid grid-cols-1 gap-4 items-center ">
            <div className="flex flex-col">
              <span className="text-muted  ">Check-in</span>
              <Popover>
                <PopoverTrigger>
                  <div className="w-full mt-2  py-2 px-2 bg-white rounded-lg flex justify-start ">
                    <span>
                      {checkIn
                        .toLocaleDateString()
                        .split("/")
                        .map((element) =>
                          element.length === 1 ? "0" + element : element
                        )
                        .join("/")}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-card">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => setValue("checkIn", date!)}
                    disabled={(date) =>
                      date <
                      new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col ">
              <span className="text-muted ">Check-out</span>
              <Popover>
                <PopoverTrigger>
                  <div className="w-full mt-2  py-2 px-2 bg-white rounded-lg flex justify-start   ">
                    <span>
                      {checkOut
                        .toLocaleDateString()
                        .split("/")
                        .map((element) =>
                          element.length === 1 ? "0" + element : element
                        )
                        .join("/")}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-card">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => setValue("checkOut", date!)}
                    disabled={(date) =>
                      date <
                      new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* ===================================================================== */}

            <div>
              <span className="text-muted ">Persons</span>

              <div className="px-2 mt-2 py-1 bg-white rounded-lg flex gap-2">
                <label className="items-center flex">
                  Adults:
                  <input
                    className="w-full p-1 bg-transparent focus:outline-none font-bold "
                    type="number"
                    min={1}
                    max={20}
                    {...register("adultCount", {
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "There must be at least one adult",
                      },
                      valueAsNumber: true,
                    })}
                  />
                </label>
                <label className="  flex items-center">
                  Children:
                  <input
                    className="w-full p-1  bg-transparent  focus:outline-none font-bold"
                    type="number"
                    min={0}
                    max={20}
                    {...register("childCount", {
                      valueAsNumber: true,
                    })}
                  />
                </label>
                {errors.adultCount && (
                  <span className="text-destructive font-semibold text-sm">
                    {errors.adultCount.message}
                  </span>
                )}
              </div>
            </div>

            {/* ===================================================================== */}

            {user ? (
              <button className=" py-3 mt-2 rounded-lg  text-white font-medium border-2 border-solid border-white transition  hover:text-black hover:bg-white ">
                BOOK NOW
              </button>
            ) : (
              <button className=" py-3 mt-2 rounded  text-white font-medium  border-2 border-solid border-white transition  hover:text-black hover:bg-white ">
                SIGN IN TO BOOK
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default GuestInfoForm;
