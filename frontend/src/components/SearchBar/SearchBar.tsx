import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./SearchContext";
import { TfiAngleDown } from "react-icons/tfi";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form onSubmit={handleSubmit} className=" bg-white shadow-lg">
      <div className="p-5 lg:p-0 grid grid-cols-1 md:grid-cols-[1.3fr_1.2fr_1fr_1fr] lg:grid-cols-[1.2fr_1.1fr_1fr_1fr_1fr] items-center gap-4 md:gap-0 ">
        <div className="flex flex-col md:flex-row ">
          <div className="py-5 px-0 md:px-7 flex md:block items-center">
            <span className="text-xs mr-6 md:mr-0 ">DESTINATION</span>
            <div className=" md:mt-2 p-2 bg-neutral-100 rounded flex flex-row items-center flex-1  ">
              <MdTravelExplore size={25} className="mr-2" />
              <input
                placeholder="Type destination"
                className=" w-full bg-neutral-100 focus:outline-none "
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-0 mt-4 md:mr-4 md:h-20 md:w-0 border border-silver self-center relative -top-2 "></div>
        </div>

        {/* =============================================================== */}

        <div className=" flex items-center md:block ">
          <p className="text-xs md:mb-1 mr-[58px] md:mr-0">GUESTS</p>
          <div className="flex">
            <div className=" flex ">
              <div className="flex ">
                <label className="items-end flex text-sm mr-2 mb-1 ">
                  Adults
                </label>
                <input
                  className="w-10  h-10  text-2xl md:text-4xl focus:outline-none  "
                  type="number"
                  min={1}
                  max={9}
                  value={adultCount}
                  onChange={(event) =>
                    setAdultCount(parseInt(event.target.value))
                  }
                />
              </div>

              <div className="flex">
                <label className="items-end flex text-sm mr-2 mb-1 ">
                  Children
                </label>
                <input
                  className=" w-10 text-2xl md:text-4xl focus:outline-none  "
                  type="number"
                  min={0}
                  max={9}
                  value={childCount}
                  onChange={(event) =>
                    setChildCount(parseInt(event.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}

        <div className=" md:justify-self-end md:w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="border border-silver w-full md:w-0 h-0 md:h-20 "></div>
          <div className=" flex md:flex-col items-center md:items-start  ">
            <span className="text-xs whitespace-nowrap mr-[47px] md:mr-0 ">
              CHECK-IN
            </span>
            <div className="flex items-end ">
              <DatePicker
                title={"check In"}
                selected={checkIn}
                onChange={(date) => setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                className="w-full lg:max-w-[120px] md:mt-5 p-2 md:p-0 bg-neutral-100 md:bg-transparent rounded md:rounded-none text-lg font-medium focus:outline-none "
              />
              <TfiAngleDown size={15} className="h-8 hidden lg:inline" />
            </div>
          </div>
          <div className="border border-silver w-full md:w-0 h-0 md:ml-5 md:h-20  "></div>
        </div>

        {/* =============================================================== */}

        <div className=" md:justify-self-center md:w-32 flex md:flex-col items-center md:items-start ">
          <span className="text-xs whitespace-nowrap mr-[34px] md:mr-0 ">
            CHECK-OUT
          </span>
          <div className="flex items-end ">
            <DatePicker
              title={"check Out"}
              selected={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full lg:w-[120px] md:mt-5 p-2 md:p-0 bg-neutral-100 md:bg-transparent rounded  text-lg font-medium focus:outline-none "
            />
            <TfiAngleDown size={15} className="h-8 hidden lg:inline" />
          </div>
        </div>
        {/* =============================================================== */}

        <button className=" w-full h-full p-5 text-sm text-neutral-100 font-medium bg-primary hover:bg-neutral-800 rounded lg:rounded-none col-span-full lg:col-span-1  ">
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
