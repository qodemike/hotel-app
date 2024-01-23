import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./pages/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        element: <PrivateRoutes />,
        children: [],
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
