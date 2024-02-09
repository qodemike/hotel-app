import useSignOut from "../../hooks/useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className="  h-7  border-l border-neutral-100 "></div>
      <button onClick={handleClick} className="relative top-[3px] hover:text-white font-bold">
        Log Out
      </button>
    </>
  );
};

export default SignOutButton;
