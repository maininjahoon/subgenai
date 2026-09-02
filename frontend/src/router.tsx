import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/account/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import AccountLayout from "./layouts/AccountLayout";
import NewRequest from "./pages/account/NewRequest";
import Subtitles from "./pages/account/Subtitles";
import Settings from "./pages/account/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "new-request",
            element: <NewRequest />,
          },
          {
            path: "subtitles",
            element: <Subtitles />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "*",
            element: <Navigate to="/account/dashboard" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
