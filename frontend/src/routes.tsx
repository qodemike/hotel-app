import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./components/SignIn/SignIn";
import HomePage from "./pages/HomePage";
import Register from "./components/Register/Register";
import PrivateRoutes from "./pages/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/register", element: <Register /> },
      {
        element: <PrivateRoutes />,
        children: [
        ],
      },
    ],
  },
]);

export default router;
