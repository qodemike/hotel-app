import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../data/hotelFacilities";
import { HotelFormData } from "./ManageHotelsForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-silver border-2 border-neutral-300 p-7 rounded " >
      <div className="mb-5">
      <h3 className="text-2xl font-medium inline ">Facilities</h3>
      <span className="text-sm text-neutral-700 ml-1"> (select facilities available in your hotel)</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {hotelFacilities.map((facility, index) => (
          <label
            key={index}
            className="cursor-pointer text-sm flex gap-1 text-gray-700 "
          >
            <input
              className="cursor-pointer mr-1 rounded-full"
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Select at least one facility";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold ">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
