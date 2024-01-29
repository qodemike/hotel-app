import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-silver border-2  border-neutral-300 rounded p-7 " >
      <h2 className="text-xl font-medium mb-3">Maximum number of guests per room</h2>
      <div className="grid grid-cols-2 gap-5">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border border-gray-400 focus:border-blue-500 focus:outline-none rounded w-full py-2 px-3 font-bold"
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
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border border-gray-400 focus:border-blue-500 focus:outline-none rounded w-full py-2 px-3 font-bold"
            type="number"
            min={0}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
