import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./components/SignIn/SignIn";
import HomePage from "./pages/HomePage";
import Register from "./components/Register/Register";
import AddHotel from "./pages/AddHotelPage";
import MyHotels from "./pages/MyHotelsPage";
import EditHotel from "./pages/EditMyHotelPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import Search from "./pages/SearchPage";
import HotelDetailPage from "./pages/HotelDetailsPage";
import CreateBookingPage from "./pages/CreateBookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/search", element: <Search /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/register", element: <Register /> },
      { path: "/detail/:hotelId", element: <HotelDetailPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: "/add-hotel", element: <AddHotel /> },
          { path: "/my-hotels", element: <MyHotels /> },
          { path: "/my-bookings", element: <MyBookingsPage /> },
          { path: "/edit-my-hotel/:hotelId", element: <EditHotel /> },
          { path: "/hotel/:hotelId/booking", element: <CreateBookingPage /> },
        ],
      },
    ],
  },
]);

export default router;
