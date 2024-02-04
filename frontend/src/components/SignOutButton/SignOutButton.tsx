import useSignOut from "../../hooks/useSignOut";

const SignOutButton = () => {
  const mutation = useSignOut();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className=" py-3 px-5 text-sm text-neutral-300 hover:text-black border hover:bg-neutral-200 border-solid border-neutral-200 rounded transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
