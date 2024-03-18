import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/entities";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import LocationSection from "./LocationSection";
import { CoordinatesType } from "../../../../backend/entities/CoordinateType";


export type HotelFormData = {
  name: string;
  address: string;
  coordinates: CoordinatesType;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
};

interface Props {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

const ManageHotelsForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>({
    defaultValues: {
      adultCount: 1,
      childCount: 0,
    },
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = async (formDataJson: HotelFormData) => {
    const formData = new FormData();

    /**
     * If edit mode append hotel id
     */
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("address", formDataJson.address);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    formData.append("coordinates[lat]", formDataJson.coordinates.lat.toString())
    formData.append("coordinates[lng]", formDataJson.coordinates.lng.toString())

    /**
     * If in edit more and some image alredy exist
     */
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className=" px-5 md:p-0  md:max-w-4xl m-auto flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold ">Please fill the form below</h2>
        <DetailsSection />
        <LocationSection/>
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="">
          <button
            disabled={isLoading}
            type="submit"
            className="py-3 w-[138px] h-12 text-white font-medium font- rounded bg-primary  hover:bg-neutral-800 disabled:bg-neutral-800"
          >
            {isLoading ? (
              <div className="h-full flex justify-center  items-center ">
                <Oval
                  secondaryColor="#ECECEC"
                  color="white"
                  height={"24px"}
                  width={"24px"}
                />
              </div>
            ) : (
              "SUBMIT"
            )}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelsForm;
