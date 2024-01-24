import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="flex flex-col bg-secondary">
      <NavBar/>
      <div className=" ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
