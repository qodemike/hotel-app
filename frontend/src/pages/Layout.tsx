import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-inter flex flex-col ">
      <NavBar/>
      <div className="pt-24 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
