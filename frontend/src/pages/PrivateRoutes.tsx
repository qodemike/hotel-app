import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated)
    return (
      <>
        <Navigate to={"/"} />
      </>
    );

  return <Outlet />;
};

export default PrivateRoutes;
