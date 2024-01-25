import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./SearchContext";
import { IoSearchOutline } from "react-icons/io5";

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
      className="p-5 bg-primary shadow-md max-w-[1150px] m-auto relative md:top-[-20px] lg:top-[-80px] "
    >
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 items-center gap-4 ">
        <div>
          <span className="text-grayedText">Destination</span>
          <div className="flex flex-row mt-3 items-center flex-1 bg-white p-2 rounded ">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="Where are you going?"
              className=" w-full focus:outline-none"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
        </div>
        {/* =============================================================== */}
        <div>
          <span className="text-grayedText">Persons</span>
          <div className="flex">
            <div className="flex bg-white px-2 py-1 rounded mt-3 w-full">
              <label className="items-center flex">
                Adults:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={1}
                  max={20}
                  value={adultCount}
                  onChange={(event) =>
                    setAdultCount(parseInt(event.target.value))
                  }
                />
              </label>
              <label className="items-center flex">
                Children:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={0}
                  max={20}
                  value={childCount}
                  onChange={(event) =>
                    setChildCount(parseInt(event.target.value))
                  }
                />
              </label>
            </div>
          </div>
        </div>
        {/* =============================================================== */}

        <div className=" justify-self-center w-full">
          <span className="text-grayedText block">Check In</span>
          <DatePicker
            title={"check In"}
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="p-2 focus:outline-none rounded mt-3 w-[100%]"
          />
        </div>

        {/* =============================================================== */}

        <div className=" justify-self-center w-full">
          <span className="text-grayedText block">Check Out</span>
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
            className="p-2 focus:outline-none mt-3 rounded w-[100%]"
          />
        </div>

        {/* =============================================================== */}

        <div className="mt-5 md:mt-0  justify-self-center self-end col-span-full lg:col-span-1">
          <button className=" py-2 pl-10 pr-16  rounded border-2 border-solid border-neutral-300 text-neutral-200  hover:bg-neutral-200 hover:text-black flex ">
           <IoSearchOutline size={23} className="mr-3"/>
           Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
