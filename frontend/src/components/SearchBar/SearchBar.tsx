import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../contexts/search/SearchContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      className=" bg-card flex flex-col lg:grid lg:grid-cols-[1fr_1fr_1fr_0.6fr] gap-5 md:gap-4 "
    >
      <div className="px-4 py-2 lg:pt-1  border border-border rounded-md ">
        <span className="text-xs mr-6 md:mr-0 ">DESTINATION</span>
        <div className="mt-1 flex gap-2">
          <MdTravelExplore size={25} />
          <input
            placeholder="Where are you going? "
            className=" text-lg w-full bg-transparent focus:outline-none "
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      </div>

      {/* =============================================================== */}

      <div className=" py-2  pt-3  border border-border rounded-md overflow-hidden flex  ">
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
                onChange={(event) =>
                  setAdultCount(parseInt(event.target.value))
                }
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
                onChange={(event) =>
                  setChildCount(parseInt(event.target.value))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* =============================================================== */}

      <div className="  px-4 py-2 border border-border rounded-md flex justify-between  ">
        <div className=" w-fit ">
          <span className="  mr-3 text-xs">CHECK-IN</span>
          <Popover>
            <PopoverTrigger>
              <span className=" md:text-lg font-medium ">
                {checkIn
                  .toLocaleDateString()
                  .split("/")
                  .map((element) =>
                    element.length === 1 ? "0" + element : element
                  )
                  .join("/")}
              </span>
            </PopoverTrigger>
            <PopoverContent className="bg-card">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(date) => setCheckIn(date!)}
                disabled={(date) => date < new Date(new Date().getTime() - (1000 * 60 * 60 * 24))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* ========================================= */}

        <div className="  relative left-10 md:left-0 lg:left-7">
          <span className=" mr-3 text-xs ">CHECK-OUT</span>
          <Popover>
            <PopoverTrigger>
              <span className=" md:text-lg font-medium ">
                {checkOut
                  .toLocaleDateString()
                  .split("/")
                  .map((element) =>
                    element.length === 1 ? "0" + element : element
                  )
                  .join("/")}
              </span>
            </PopoverTrigger>
            <PopoverContent className="bg-card">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(date) => setCheckOut(date!)}
                disabled={(date) => date < new Date(new Date().getTime() - (1000 * 60 * 60 * 24))}
              />
            </PopoverContent>
          </Popover>
          
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
