const dateToString = (date: Date): string => {
  return new Date(date)
    .toLocaleDateString()
    .split("/")
    .map((element) => (element.length < 2 ? "0" + element : element))
    .join("-");
};

export default dateToString