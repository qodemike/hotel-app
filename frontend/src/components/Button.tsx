import React, { PropsWithChildren, ReactNode } from "react";

interface Props{
    children: ReactNode;
    onClick?: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="bg-black py-3 px-7 w-fit text-white text-sm hover:bg-secondary cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
