import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/Filters/StarRatingFilter";
import HotelTypesFilter from "../components/Filters/HotelTypesFilter";
import FacilitiesFilter from "../components/Filters/FacilitiesFilter";
import PriceFilter from "../components/Filters/PriceFilter";
import SearchBar from "../components/SearchBar/SearchBar";
import { useSearchContext } from "../components/SearchBar/SearchContext";
import useSearch from "../hooks/useSearch";
import { IoFilterOutline } from "react-icons/io5";

const SearchPage = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useSearch(searchParams);

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <>
      <div className=" mt-[95px] grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <div className=" h-fit p-5 pb-10 ml-3 mb-4  rounded-lg border border-slate-300 bg-white shadow-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-slate-300 ">
              Filter by:
            </h3>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
            <HotelTypesFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 px-5">
          <div className="flex">
            <SearchBar />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </span>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 text-sm border-2 rounded-md outline-none  focus:border-blue-300 focus:border-2 "
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>

          {/* =========================================== */}

          {hotelData?.data.map((hotel) => (
            <SearchResultsCard hotel={hotel} />
          ))}

          {/* ============================================ */}

          <div>
            {hotelData?.pagination.total === 0 ? null : (
              <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
