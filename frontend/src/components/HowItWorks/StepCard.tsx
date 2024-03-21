
interface Props {
  step: string;
  description: string;
}

const StepCard = ({ step, description }: Props) => {
  return (
    <div className=" md:min-h-[250px]  lg:w-[200px] grid grid-cols-2 md:flex md:flex-col items-center  gap-5">
      <div className={" w-full md:w-[150px] lg:w-full  h-[150px] lg:h-[200px]  bg-secondary  shadow-lg"}></div>
      <div className="flex flex-col md:items-center gap-3 md:gap-4">
      <h3 className="text-white text-lg font-bold">{step}</h3>
      <p className="  text-muted/80 md:text-center text-sm ">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
