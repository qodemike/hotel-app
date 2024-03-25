import StepCard from "./StepCard";

const HowItWorksSection = () => {
  const procedures = [
    {
      icon: "",
      step: " Create Account",
      description: "Enter your information an initiate an identity with us ",
    },
    {
      icon: "",
      step: " Find your hotel",
      description: "Browse hotels and find the one the will suit you",
    },
    {
      icon: "",
      step: " Add Payment",
      description: "Add payment information for clearing invoices of stay",
    },
    {
      icon: "",
      step: " You're all Set!",
      description: "After successful payment your room is secured ",
    },
  ];

  return (
    <section className=" py-10 pb-20 px-5 md:px-8 lg:px-16 bg-accentBg">
      <div className="  text-white flex flex-col  items-center gap-2 ">
        <h2 className="font-bold text-2xl  md:text-3xl">How it works</h2>
        <p className="text-center text-xs md:text-base">
           Glimpse below to understand how our platform generally works
        </p>
      </div>
      <div className="mt-10 w-full flex flex-col md:flex-row items-center gap-6 md:justify-between lg:justify-evenly ">
      {procedures.map((step) => (
        <StepCard step={step.step} description={step.description}></StepCard>
      ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
