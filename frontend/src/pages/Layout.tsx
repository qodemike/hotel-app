import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-inter flex flex-col ">
      <NavBar/>
      <div className="bg-background ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
