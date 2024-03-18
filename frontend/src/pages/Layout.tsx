import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <div className="font-inter flex flex-col ">
      <NavBar/>
      <div className="pt-24 ">
        <ScrollToTop>
        <Outlet />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default Layout;
