import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="flex flex-col bg-secondary">
      <NavBar/>
      <div className="bg-neutral-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
