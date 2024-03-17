import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="hotelform-card  flex flex-col gap-4">
      <h3 className=" text-lg font-bold">1. HOTEL INFORMATION</h3>
      <label className=" text-sm font-bold ">
        Hotel Name
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          className=" hotelform-input"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div>
        <label className=" text-sm font-bold">
          Description
          <span className="text-xs ml-1 ">(maximum 1000 characters)</span>
        </label>
        <textarea
          rows={5}
          placeholder="Write a description of your hotel"
          className=" hotelform-input w-full  p-4"
          {...register("description", {
            required: "This field is required",
            max: "Exceeding 1000 characters limit",
          })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className=" text-sm font-bold md:max-w-[50%]  ">
        <label>Price Per Night</label>
        <div className="h-[37px] relative overflow-hidden  mt-1 rounded  border border-border outline outline-0 focus:outline-2 outline-blue-300  ">
          <input
            type="number"
            min={1}
            className=" w-full h-full  p-2 pl-10 focus:outline-none  "
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          <div className="absolute inset-0 text-lg w-8 bg-background  border-r flex justify-center items-center">
            <span>$</span>
          </div>
        </div>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </div>

      <div className=" text-sm  font-bold md:max-w-[50%]">
        <label>Star Rating</label>
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className=" hotelform-input "
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
      </div>
    </div>
  );
};

export default DetailsSection;
