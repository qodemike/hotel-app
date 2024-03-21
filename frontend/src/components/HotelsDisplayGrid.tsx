import HotelCard from "./HotelCard";
import useHotels from "../hooks/useHotels";
import { useState } from "react";
import Pagination from "./Pagination";
import HotelDisplayGridSkeleton from "./HotelDisplayGridSkeleton";

const HotelDisplayGrid = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useHotels(page);
  

  return (
    <section className="  " id="hotel_display_grid">
      <article className=" py-10 px-5 md:px-10 lg:px-20 flex flex-col items-center gap-3 ">
        <h2 className="text-2xl md:text-3xl font-bold ">
          Explore the Best Listings
        </h2>
        <p className="  text-xs md:text-base ">
          Explore newly added hotels from all around the world.
        </p>
      </article>

      <div className=" pb-10 mx-5 md:mx-10 ">
        {isLoading ? (
          <HotelDisplayGridSkeleton />
        ) : (
          <div className=" max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-5 ">
            {data?.data.map((hotel, index) => (
              <div key={index}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        )}
        {data ? (
          <div className="mt-10">
            <Pagination
              page={page}
              pages={data.pagination.pages}
              onPageChange={(pageNumber) => {
                setPage(pageNumber);
              }}
            ></Pagination>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default HotelDisplayGrid;
