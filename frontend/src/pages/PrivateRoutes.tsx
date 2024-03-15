import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuthContext();

  if (!user)
    return (
      <>
        <Navigate to={"/"} />
      </>
    );

  return <Outlet />;
};

export default PrivateRoutes;
