
interface Props {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, pages, onPageChange}: Props) => {
  const pageNumbers = [];

  
  for (let i = 1; i <= pages; i++) pageNumbers.push(i);

  return (
    <div className="flex justify-center">
      <ul className="flex gap-1">
        {pageNumbers.map((number, index) => (
          <li
            onClick={() => onPageChange(number)}
            key={index}
            className={`px-2 py-1  rounded-2xl  border border-neutral-300  cursor-pointer ${
              page === number
                ? "text-white bg-primary "
                : "bg-white  hover:bg-slate-100"
            }`}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
