import { ReactNode } from "react";

interface Props{
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button = ({ children, onClick, className }: Props) => {
  return (
    <button onClick={onClick} className={`bg-primary py-3 px-7 w-fit text-white text-sm hover:bg-secondary flex justify-center items-center gap-2 cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Button;
