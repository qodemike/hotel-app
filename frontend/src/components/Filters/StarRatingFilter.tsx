interface Props  {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-border pb-5">
      <h4 className="text-sm font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star, index) => (
        <label key={index} className="flex items-center space-x-3 text-[14px] cursor-pointer mb-1 ml-3">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span className="">{star} star</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
