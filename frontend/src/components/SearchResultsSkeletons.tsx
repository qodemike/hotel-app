import Skeleton from "react-loading-skeleton";

const SearchResultsSkeletons = () => {
  const skeletons = Array(5).fill(0);
  return (
    <div className="flex flex-col gap-6">
      {skeletons.map((skeleton, index) => (
        <div key={index} className=" lg:p-3 bg-card drop-shadow-lg grid grid-cols-1 xl:grid-cols-2  ">
          <Skeleton className=" h-[250px] " />

          {/* =============================================== */}

          <div className=" m-4  mt-2  lg:ml-10  flex flex-col gap-7 ">
            <div>
              <div className="h-3"></div>
              <Skeleton className="h-[28px]" />
            </div>

            <div>
              <div className="mb-2 text-sm line-clamp-4 ">
                <Skeleton count={5} />
              </div>
            </div>

            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsSkeletons;
