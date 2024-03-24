import { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelsForm";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import { CoordinatesType } from "../../../../backend/entities/CoordinateType";

const GOOGLEMAPS_API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const GEOCODING_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;

const LocationSection = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLEMAPS_API_KEY,
  });

  const { setValue, getValues } = useFormContext<HotelFormData>();
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    lat: 0,
    lng: 0,
  });

  const handleLocationSelection = async (e: google.maps.MapMouseEvent) => {
    setCoordinates({
      lat: Math.round(e.latLng!.lat() * 1000000) / 1000000,
      lng: Math.round(e.latLng!.lng() * 1000000) / 1000000,
    });

    setValue("coordinates", coordinates);

    // Make a request to the reverse Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng?.lat()},${e.latLng?.lng()}&key=${GEOCODING_API_KEY}`
    );
    const { results, status } = await response.json();

    // Extract country and city from the formatted address
    if (status === "OK") {
      if (results && results.length > 0) {
        setValue(
          "address",
          results[0].formatted_address.split(" ").slice(-3).join(" ")
        );
      }
    }
  };

  return (
    <div className="hotelform-card">
      <div className="mb-8">
        <h3 className=" mb-3 text-lg font-bold">2. HOTEL LOCATION</h3>
        <p className="text-sm">
          Find location on the map and{" "}
          <span className="font-bold">Double click</span> to place a marker.
        </p>
      </div>
      <div className=" lg:grid  lg:grid-cols-[1fr_1fr]">
        <div className="mb-5 flex flex-col gap-2">
          <span className="text-sm  font-bold">Selected Location Address</span>
          <span className="p-2 border flex items-center gap-2">
            <FaLocationDot size={18} />
            {getValues().address || (
              <span className=" text-sm text-muted-foreground ">
                {"Pin a location on the map"}
              </span>
            )}
          </span>
        </div>
      </div>

      <div className=" h-[400px]">
        {loadError ? (
          <div className="w-full h-full text-destructive flex justify-center items-center ">
            Could not load the map. Please refresh the page
          </div>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={2}
            center={getValues().coordinates || coordinates}
            onDblClick={handleLocationSelection}
          >
            <MarkerF position={getValues().coordinates || coordinates} />
          </GoogleMap>
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default LocationSection;
