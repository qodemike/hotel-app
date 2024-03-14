import { useState } from "react";
import SearchContext from "./SearchContext";

interface Props {
  children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: Props) => {

  const [destination, setDestination] = useState<string>( () => sessionStorage.getItem("destination") || "");

  const [checkIn, setCheckIn] = useState<Date>( () => new Date( sessionStorage.getItem("checkIn") || new Date().toISOString()));
  
  const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
  
  const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
  
  const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem("childCount") || "1"));

  const [hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem("hotelId") || "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    
    // Update the State
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (hotelId) {
      setHotelId(hotelId);
    }

    // Save the search values in the session storage
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};


