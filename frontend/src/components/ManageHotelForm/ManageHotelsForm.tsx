import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/entities";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
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

  const onSubmit = (formDataJson: HotelFormData) => {
    const formData = new FormData();

    // If In edit mode
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

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
        className=" my-[100px]  px-5 md:p-0  md:max-w-4xl m-auto flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold ">Please fill the form below</h2>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="">
          <button
            disabled={isLoading}
            type="submit"
            className="py-3 w-[138px] text-white font-medium font- rounded bg-primary  hover:bg-neutral-800 disabled:bg-neutral-800"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Oval
                  secondaryColor="#ECECEC"
                  color="white"
                  height={"30px"}
                  width={"30px"}
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
