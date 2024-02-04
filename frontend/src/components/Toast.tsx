import { useEffect, useRef } from "react";

export interface ToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}

interface Props {
  message: string;
  type: "SUCCESS" | "ERROR";
  closeToast: () => void;
}

const Toast = ({ message, type, closeToast }: Props) => {
  const styles = type === "SUCCESS" ? "bg-emerald-500" : "bg-red-600 ";
  const toast = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    toast.current.style.transform = "translateX(0)";

    const timeout = setTimeout(() => {
      toast.current.style.transform = "translateX(120%)";
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message, closeToast]);

  return (
    <div
      ref={toast}
      className={`text-white max-w-md bg-primary fixed bottom-20 right-4 z-50 flex flex-row transition translate-x-[120%]`}
    >
      <div className={" w-[10px] h-[70px] " + styles}></div>
      <div className="flex justify-center items-center p-5 ">
        <span className="">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
