import useSignOut from "../../hooks/useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="flex">
      <div className=" relative top-1 h-7 mr-5 border-l  border-neutral-100 "></div>
      <button
        onClick={handleClick}
        className="relative top-[3px] hover:text-white font-bold"
      >
        Log Out
      </button>
    </div>
  );
};

export default SignOutButton;
