import { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";

const GOOGLEMAPS_API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const GEOCODING_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;

export interface Coordinates {
  lat: number;
  lng: number;
}

const LocationSection = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLEMAPS_API_KEY,
  });

  const { setValue, getValues } = useFormContext<HotelFormData>();
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const handleLocationSelection = async (e: google.maps.MapMouseEvent) => {
    setCoordinates({
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    });
    setValue("coordinates", coordinates);

    // Make a request to the Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng?.lat()},${e.latLng?.lng()}&key=${GEOCODING_API_KEY}`
    );
    const data = await response.json();

    // Extract country and city from the formatted address
    if (data.status === "OK") {
      const { results } = data;
      if (results && results.length > 0) {
        setValue(
          "address",
          results[0].formatted_address.split(" ").slice(-2).join(" ")
        );
      }
    }
  };

  if (loadError) return <div>Error loading maps. Refresh</div>;

  return (
    <div className="bg-white border-2 border-neutral-300  p-7">
      <h3 className=" text-lg font-bold mb-5 flex flex-col md:flex-row items-center ">
        2. HOTEL LOCATION
      </h3>

      <div className="mb-5 flex flex-col gap-2">
        <span className="text-sm  font-bold">
          Selected Location Address
          <span className=" ml-2 text-sm text-muted-foreground ">
            (Double click to place location)
          </span>
        </span>
        <span className="p-2 border flex items-center gap-2">
          <FaLocationDot />
          {getValues().address || "Pick a location from the map"}
        </span>
      </div>

      <div className=" h-[400px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={1.5}
            center={coordinates}
            onDblClick={handleLocationSelection}
          >
            <MarkerF position={coordinates} />
          </GoogleMap>
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default LocationSection;
