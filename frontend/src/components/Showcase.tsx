import showCaseImage1 from "../assets/hotel_showcase_1.webp";
import showCaseImage2 from "../assets/hotel_showcase_2.webp";

const Showcase = () => {
  return (
    <>
    <section className="py-[50px] flex flex-col lg:flex-row max-w-[1150px] mx-auto px-7 ">
      <div className="flex gap-4 justify-start md:justify-center ">
          <img src={showCaseImage1} alt="hotel interior sample 1" className="" />
          <img src={showCaseImage2} alt="hotel interior sample 2" className=" hidden md:block relative top-[50px]"/>
      </div>

      <article className="max-w-lg md:mx-auto md:mt-20">
        <h2 className="font-medium text-2xl md:text-3xl mt-5 ">
          Enjoy an unforgettable stay with the best charms
        </h2>
        <p className="mt-4  md:ml-10 lg:mt-10 ">
          Welcome to our hotel booking platform, where your travel experience
          becomes easier and more. You can discover the perfect accommodation
          for your stay worldwide.
        </p>
      </article>
      </section>
    </>
  );
};

export default Showcase;
