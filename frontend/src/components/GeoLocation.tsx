import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import { CoordinatesType } from "../../../backend/entities/CoordinateType";

const GOOGLEMAP_API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;

interface Props {
  coordinates: CoordinatesType;
}

const GeoLocation = ({ coordinates }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLEMAP_API_KEY,
  });

  return (
    <div className=" h-[400px] md:h-[350px]">
      {loadError ? (
        <div className="w-full h-full text-destructive flex justify-center items-center">
          Could not load the map. Please refresh the page
        </div>
      ) : isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={12}
          center={coordinates}
        >
          <MarkerF position={coordinates} />
        </GoogleMap>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};

export default GeoLocation;
