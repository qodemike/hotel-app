import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setSortOption: (value: string) => void;
}

const SortByFilter = ({ setSortOption }: Props) => {
  const sortOptions = [
    { sortOpt: "Star Rating", value: "starRating" },
    { sortOpt: "Price per night (Asc)", value: "pricePerNightAsc" },
    { sortOpt: "Price per night (Dsc)", value: "pricePerNightDsc" },
  ];

  return (
    <Select
      onValueChange={(value) => {
        value === "0" ? setSortOption("") : setSortOption(value);
      }}
    >
      <SelectTrigger className="bg-white w-[180px]  md:w-[200px]">
        <SelectValue placeholder="Sort By... " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectItem value={"0"}>Sort By...</SelectItem>
        {sortOptions.map((option) => (
          <SelectItem key={option.sortOpt} value={option.value}>
            {option.sortOpt}
          </SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortByFilter;
