import useSignOut from "./useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className=" flex items-center py-3 px-7 border-2 border-solid border-neutral-300 rounded-md text-md text-neutral-300 hover:border-white hover:text-white "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;