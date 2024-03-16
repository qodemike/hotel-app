import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" bg-white border-2  border-neutral-300  p-7 ">
      <h2 className="text-lg font-bold mb-3">5. GUESTS PER BOOKING</h2>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-gray-700 text-sm font-semibold">Adults</label>
          <input
            className="hotelform-input font-bold"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "Atleast one adult required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </div>
        <div>
          <label className="text-gray-700 text-sm font-semibold">
            Children
          </label>

          <input
            className=" hotelform-input font-bold"
            type="number"
            min={0}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
