import useSignOut from "../hooks/useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="  py-3 px-5 text-sm text-neutral-300 hover:text-black border-2 border-solid border-neutral-200 rounded  transition hover:bg-neutral-200  flex items-center "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
