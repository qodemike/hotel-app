import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn)
    return (
      <>
        <Navigate to={"/"} />
      </>
    );

  return <Outlet />;
};

export default PrivateRoutes;
