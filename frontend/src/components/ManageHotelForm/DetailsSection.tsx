import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-silver border-2 border-neutral-300  p-7 rounded flex flex-col gap-4">
      <h3 className=" text-2xl font-medium">Hotel details</h3>
      <label className="text-gray-700  text-sm font-bold flex-1">
        Hotel Name
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          className="border border-gray-400 focus:outline-none   focus:border-blue-500 rounded w-full py-2 px-2 font-normal"
        ></input>
        {errors.name && (<span className="text-red-500">{errors.name.message}</span>)}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border border-gray-400 focus:outline-none   focus:border-blue-500 rounded w-full py-2 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border border-gray-400 focus:outline-none   focus:border-blue-500 rounded w-full py-2 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <div >
      <label className="text-gray-700 text-sm font-bold  flex-1"> Description <span className="text-xs  text-neutral-500 ml-1 ">(maximum 1000 characters)</span></label>
        <textarea
          rows={5}
          placeholder="Write a description of your hotel"
          className="border border-gray-400 focus:outline-none   focus:border-blue-500 rounded w-full  p-4 font-normal  mt-1"
          {...register("description", { required: "This field is required", max: 'Exceeding 1000 characters limit' })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border border-gray-400   focus:border-blue-500 focus:outline-none rounded w-full py-2 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm    font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border border-gray-400 focus:border-blue-500 focus:outline-none rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <option key={index} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
