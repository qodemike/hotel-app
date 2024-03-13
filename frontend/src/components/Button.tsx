import { ReactNode } from "react";

interface Props{
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button = ({ children, onClick, className }: Props) => {
  return (
    <button onClick={onClick} className={`bg-black py-3 px-7 w-fit text-white text-sm hover:bg-secondary cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;
