import React, { useContext } from "react";

export interface SearchContextType{
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = React.createContext<SearchContextType>({} as SearchContextType);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};

export default SearchContext;
