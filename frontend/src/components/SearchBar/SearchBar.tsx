import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./SearchContext";

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
    <form
      onSubmit={handleSubmit}
      className="p-5  bg-card shadow-lg flex flex-col lg:grid   lg:grid-cols-[1fr_1fr_1fr_0.6fr] gap-5 md:gap-4 "
    >
      <div className="px-4 py-2 lg:pt-1  border border-border rounded-md ">
        <span className="text-xs mr-6 md:mr-0 ">DESTINATION</span>
        <div className="mt-1 flex">
          <MdTravelExplore size={25} className="mr-4" />
          <input
            placeholder="Where are you going? "
            className=" text-lg w-full bg-transparent focus:outline-none "
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      </div>

      {/* =============================================================== */}

      <div className=" py-2  pt-3  border border-border rounded-md overflow-hidden ">
        <div className=" relative left-4 ">
        <p className="text-xs">GUESTS</p>
        <div className="mt-1 flex gap-8 md:gap-0 lg:gap-8 ">
          <div className=" text-lg ">
            <label className="  ">adults</label>
            <input
              className=" w-12  pl-2 font-bold bg-transparent focus:outline-none  "
              type="number"
              min={1}
              max={9}
              value={adultCount}
              onChange={(event) => setAdultCount(parseInt(event.target.value))}
            />
          </div>

          <div className="text-lg flex  ">
            <label className=" ">children</label>
            <input
              className=" w-12 pl-2 font-bold bg-transparent focus:outline-none  "
              type="number"
              min={0}
              max={9}
              value={childCount}
              onChange={(event) => setChildCount(parseInt(event.target.value))}
            />
          </div>
        </div>
        </div>
      </div>

      {/* =============================================================== */}

      <div className=" w-full px-4 py-2 border border-border rounded-md flex  justify-between  ">
        <div className="  ">
          <span className=" mr-3 text-xs">CHECK-IN</span>
          <DatePicker
            title={"check In"}
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            className="w-28 mt-1 md:text-lg font-medium bg-transparent focus:outline-none "
          />
        </div>

        {/* ========================================= */}

        <div className=" relative lg:left-5">
          <span className=" mr-3 text-xs    ">CHECK-OUT</span>
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
            className=" w-[110px] mt-1 md:text-lg font-medium bg-transparent focus:outline-none "
          />
        </div>
      </div>

      {/* =============================================================== */}

      <button className=" py-5 w-full h-full text-sm text-neutral-100 font-medium bg-black hover:bg-secondary rounded col-span-full lg:col-span-1  ">
        SEARCH
      </button>
    </form>
  );
};

export default SearchBar;
