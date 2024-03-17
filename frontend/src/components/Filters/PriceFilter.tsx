interface Props {
  selectedPrice?: number;
  onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-2"> Max Price</h4>
      <select
        className=" w-full p-2 text-sm border-2 rounded-md  focus:outline-none "
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price, index) => (
          <option key={index} value={price}>
            ${price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
