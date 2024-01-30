import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./pages/PrivateRoutes";
import HotelDetailPage from "./pages/HotelDetailsPage";
import SearchPage from "./pages/SearchPage";
import MyHotelsPage from "./pages/MyHotelsPage";
import AddHotelPage from "./pages/AddHotelPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/detail/:hotelId", element: <HotelDetailPage /> },
      { path: "/search", element: <SearchPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/my-hotels", element: <MyHotelsPage /> },
          { path: "/add-hotel", element: <AddHotelPage /> },
          { path: "/edit-my-hotel/:hotelId", element: <EditHotelPage /> },

        ],
      },
    ],
  },
  
  {
    path: "auth",
    element: <AuthPage/>,
    children: [
      { path: "sign-in", element: <SignIn/> },
      { path: "register", element: <Register/> },

    ],
  },
]);

export default router;
