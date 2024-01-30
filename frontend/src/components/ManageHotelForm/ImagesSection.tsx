import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent< HTMLButtonElement, MouseEvent >,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="bg-silver border-2 border-neutral-300 rounded p-7">
      <div className=" mb-3">
      <h2 className="text-xl font-medium  inline">Images</h2>
      <span className="text-sm text-neutral-800 font-medium mr-2 " > ( 5 images, max size: 2MB ) </span>
      </div>
      <div className="bg-white border border-gray-400 rounded p-4 flex flex-col gap-4 mb-2">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            { existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full  text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + ( existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 5) {
                return "Total number of images cannot be more than 5";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
