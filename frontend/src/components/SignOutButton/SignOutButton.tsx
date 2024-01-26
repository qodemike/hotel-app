import useSignOut from "../hooks/useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className=" flex items-center py-3 px-5 border-2 border-solid border-neutral-300 rounded text-sm text-neutral-300 transition hover:bg-secondary hover:text-black "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
