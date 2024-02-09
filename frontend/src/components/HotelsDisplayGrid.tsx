import HotelCard from "./HotelCard";
import useHotels from "../hooks/useHotels";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const HotelDisplayGrid = () => {
  const [page, setPage] = useState<number>(1);

  const { data } = useHotels(page);

  return (
    <section className="py-[80px]  " id="hotel_display_grid">
      <article className=" py-8 px-5 md:px-10 lg:px-20 bg-primary ">
        <h2 className="text-xl md:text-3xl text-white font-bold ">
          Explore the Best Listings
        </h2>
        <p className=" mt-2 text-xs md:text-base text-white">
          Explore newly added hotels from all around the world.
        </p>
      </article>
      <div className=" py-10 px-5 md:px-10 ">
        <div className=" max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-5 ">
          {data?.data.map((hotel, index) => (
            <div key={index}>
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
          {data ? (
            <div className="mt-10">
            <Pagination
              page={page}
              pages={data.pagination.pages}
              onPageChange={(pageNumber) =>{ setPage(pageNumber); }}
              
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
