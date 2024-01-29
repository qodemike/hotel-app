import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../data/hotelTypes";
import { HotelFormData } from "./ManageHotelsForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="bg-silver border-2 border-neutral-300 p-7 rounded flex flex-col gap-4">
      <div>
      <h3 className="text-2xl font-medium mb-5 inline">Hotel type</h3>
      <span className="text-sm text-neutral-700 ml-3 ">(select your hotel type)</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? "cursor-pointer bg-primary text-white text-xs md:text-sm rounded-full px-5 py-2 font-semibold"
                : "cursor-pointer bg-white hover:bg-gray-300 border-2 border-neutral-300  text-xs md:text-sm rounded-full px-5 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "please select a hotel type",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
