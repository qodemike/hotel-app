import { hotelTypes } from "../../data/hotelTypes";

interface Props {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-border pb-5">
      <h4 className="text-sm font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType, index ) => (
        <label key={index} className="flex items-center space-x-3 ml-3 mb-1 cursor-pointer text-[14px]">
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
