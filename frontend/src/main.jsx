import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Faculty } from "./pages/Faculty.jsx";
import { Admin } from "./pages/Admin.jsx";
import { Student } from "./pages/Student.jsx";
import { Header } from "./components/Header.jsx";
import { Attendance } from "./pages/Faculty/Attendence";
import { DemoForm } from "./components/DemoForm";
import { StudentDashboard } from "./pages/Student/Dashboard";
import { Course } from "./pages/Admin/Course";

const router = createBrowserRouter([
  {
    path: "/faculty",
    element: <Faculty />,
    children: [
      {
        path: "/faculty/dashboard",
        element: <Header title="Dashboard" />,
      },
      {
        path: "/faculty/attendance",
        element: <DemoForm />,
      },
      {
        path: "/faculty/assignment",
        element: <Header title="Assignment" />,
      },
      {
        path: "/faculty/:anything",
        element: <Header title="Feature Coming Soon" />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Header title="Dashboard" />,
      },
      {
        path: "/admin/course",
        element: <Course />,
      },
      {
        path: "/admin/:anything",
        element: <Header title="Feature Coming Soon" />,
      },
    ],
  },
  {
    path: "/student",
    element: <Student />,
    children: [
      {
        path: "/student/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/student/attendance",
        element: <Header title="Attendance" />,
      },
      {
        path: "/student/assignment",
        element: <Header title="Assignment" />,
      },
      {
        path: "/student/fees",
        element: <Header title="Fees" />,
      },
      {
        path: "/student/:anything",
        element: <Header title="Feature Coming Soon" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
