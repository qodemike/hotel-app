import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../SearchBar/SearchContext";
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css'

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
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

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

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

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
          <span className="block mb-1 text-grayedText">Price per night</span>
          <span className="text-md font-bold text-white ">
            {"$" + pricePerNight}
          </span>
        </div>
        {/* ===================================================================== */}

        <form
          onSubmit={
            isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
          }
        >
          <div className="grid grid-cols-1 gap-4 items-center ">
            <div>
              <span className="text-grayedText ">Check-in</span>
              <DatePicker
                required
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                className="min-w-full p-2 mt-2 bg-silver hover:bg-white rounded-lg  focus:outline-none "
                wrapperClassName="min-w-full"
              />
            </div>
            <div>
              <span className="text-grayedText ">Check-out</span>
              <DatePicker
              {...register('checkOut',  )}
                required
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-out Date"
                className="p-2 mt-2 min-w-full bg-silver hover:bg-white rounded-lg focus:outline-none "
                wrapperClassName="min-w-full"
              />
            </div>
            {/* ===================================================================== */}

            <div>
              <span className="text-grayedText ">Persons</span>

              <div className="px-2 mt-2 py-1 bg-silver rounded-lg flex gap-2">
                <label className="items-center flex">
                  Adults:
                  <input
                    className="w-full p-1 bg-silver focus:outline-none font-bold "
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
                    className="w-full p-1 bg-silver  focus:outline-none font-bold"
                    type="number"
                    min={0}
                    max={20}
                    {...register("childCount", {
                      valueAsNumber: true,
                    })}
                  />
                </label>
                {errors.adultCount && (
                  <span className="text-red-500 font-semibold text-sm">
                    {errors.adultCount.message}
                  </span>
                )}
              </div>
            </div>

            {/* ===================================================================== */}

            {isLoggedIn ? (
              <button className=" py-3 mt-2 rounded-lg  text-white font-medium border-2 border-solid border-white transition  hover:text-black hover:bg-neutral-100 hover:border-neutral-100">
                BOOK NOW
              </button>
            ) : (
              <button className=" py-3 mt-2 rounded  text-white font-medium  border-2 border-solid border-white transition  hover:text-black hover:bg-neutral-100 ">
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
