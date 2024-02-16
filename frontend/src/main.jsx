import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Faculty } from "./pages/Faculty.jsx";
import { Admin } from "./pages/Admin.jsx";
import { Student } from "./pages/Student.jsx";
import { Header } from "./components/header.jsx";

const router = createBrowserRouter([
  {
    path: "/faculty",
    element: <Faculty />,
    children: [
      {
        path: "/faculty/dashboard",
        element: <Header text="dashboard" />,
      },
      {
        path: "/faculty/attendance",
        element: <Header text="attendance" />,
      },
      {
        path: "/faculty/assignment",
        element: <Header text="assignment" />,
      },
      {
        path: "/faculty/fees",
        element: <Header text="fees" />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/student",
    element: <Student />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
