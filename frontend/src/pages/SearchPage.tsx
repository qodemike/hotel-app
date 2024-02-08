import { useEffect, useRef, useState } from "react";
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
import MiniFooter from "../components/MiniFooter";
import { Oval } from "react-loader-spinner";


const SearchPage = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const [isShowingFilter, setIsShowingFilter] = useState(false);
  const filterDivRef = useRef<HTMLDivElement>(null);

  const handleCloseFilterPanel = (e: MouseEvent) => {
    if (
      filterDivRef.current &&
      !filterDivRef.current.contains(e.target as Node)
    ) {
      setIsShowingFilter(false);
    }
  };

  const handleOpenFilterPanel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShowingFilter(true);
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseFilterPanel);
    return () => document.removeEventListener("click", handleCloseFilterPanel);
  }, []);

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

  const { data: hotelData , isLoading: isFetchingHotels } = useSearch(searchParams);

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
        {/* =============================================================================== */}

        <div
          ref={filterDivRef}
          className={`w-[60vw] md:w-[40vw] lg:w-full h-screen lg:h-fit  p-7 pb-10 lg:mb-5 lg:ml-3  lg:rounded-lg border border-slate-300 bg-white shadow-lg z-30 md:z-0 fixed  top-0 overflow-y-scroll lg:overflow-auto  lg:relative transition  ${
            isShowingFilter ? "translate-x-0 " : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className=" space-y-4">
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

        {/* =============================================================================== */}

        <div className="mb-16 px-5 flex flex-col gap-5">
          <div className="">
            <SearchBar />
          </div>
          <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
            <span className="mb-5 md:mb-0 text-2xl font-bold whitespace-nowrap self-center lg:self-end">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </span>
            <div className=" flex gap-5 justify-between">
              <div
                onClick={handleOpenFilterPanel}
                className="md:hidden flex font-bold  items-center gap-2 cursor-pointer"
              >
                <IoFilterOutline size={17} className="" />
                <span>Filters</span>
              </div>

              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className=" max-w-[190px] p-2 text-sm border-2 rounded-md outline-none  focus:border-blue-300 focus:border-2 "
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
          </div>
          <div className="border-b border-neutral-300 "></div>

          {/* =========================================== */}

          {isFetchingHotels ? <div className=" pt-20 md:pt-36 flex justify-center  " style={{height: 'calc(100vh - 530px)'}}>
            <Oval
              secondaryColor="gray"
              color="black"
              height={"50px"}
            ></Oval>{" "}
          </div> : hotelData?.data.map((hotel) => (
            <SearchResultsCard hotel={hotel} />
          ))}

          {/* ============================================ */}

          <div className="">
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
      <MiniFooter/>
    </>
  );
};

export default SearchPage;
