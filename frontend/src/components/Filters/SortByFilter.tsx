import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setSortOption: (value: string) => void;
}

const SortByFilter = ({setSortOption}: Props) => {
  const sortOptions = [
    { sortOpt: "Star Rating", value: "starRating" },
    { sortOpt: "Price per night (Asc)", value: "pricePerNightAsc" },
    { sortOpt: "Price per night (Dsc)", value: "pricePerNightDsc" },
  ];

  return (
    <Select  onValueChange={(value) => setSortOption(value)}>
      <SelectTrigger className="bg-white min-w-[160px]">
        <SelectValue placeholder="Sort By... " />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.sortOpt} value={option.value}>
              {option.sortOpt}
            </SelectItem>
          ))}
        </SelectContent>
    </Select>
  );
};

export default SortByFilter;
