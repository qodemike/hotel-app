import Skeleton from "react-loading-skeleton";

const HotelDisplayGridSkeleton = () => {
  const skeletons = Array(9).fill(0);

  return (
    <div>
      <div className=" max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-5 ">
        {skeletons.map(( index) => (
            <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-[400px] md:h-[300px] " />

            </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDisplayGridSkeleton;
