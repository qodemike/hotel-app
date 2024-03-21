import showCaseImage1 from "../assets/Loft.png";

const Showcase = () => {
  return (
    <>
      <section className=" md:custom-container relative -top-[170px] pt-[215px] pb-12 bg-primaryLight md:bg-background flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-[1.2fr_1fr] md:items-center gap-12 md:gap-10 lg:gap-0 ">
        <div className=" relative lg:justify-self-center ">
          <div className=" hidden lg:block  w-[400px] h-[450px] bg-accentBg " />
          <img
            src={showCaseImage1}
            alt="hotel interior sample 1"
            className=" relative lg:absolute md:top-12 lg:left-12 px-8 md:px-0 h-[450px] lg:h-[480px] object-cover  "
          />
        </div>

        <article className=" max-w-md text-white md:text-black flex flex-col items-center md:items-start  gap-5  ">
          <h2 className=" text-2xl md:text-3xl font-bold   ">
            Enjoy the Best of Stays
          </h2>
          <p className=" px-6 md:px-0 text-sm text-center md:text-left ">
            Welcome to our hotel booking platform, where your travels have never
            been made easier. Let us be incharge of your accommodation as you
            tour the world. Find affordable and secure hotels from all around
            the world
          </p>
        </article>
      </section>
    </>
  );
};

export default Showcase;
