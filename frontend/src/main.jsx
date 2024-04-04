import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Faculty } from "./pages/Faculty.jsx";
import { Admin } from "./pages/Admin.jsx";
import { Student } from "./pages/Student.jsx";
import { Header } from "./components/Header.jsx";
import {
  FacultyAttendance,
  FacultyAttendanceCalender,
} from "./pages/Faculty/FacultyAttendance";
import { StudentDashboard } from "./pages/Student/Dashboard";
import { Courses } from "./pages/Admin/Courses";
import { StudentAttendance } from "./pages/Student/StudentAttendance";
import { AttendanceForm } from "./components/AttendanceForm";
import { Students } from "./pages/Admin/Students";
import { Faculties } from "./pages/Admin/Faculties";
import { Classes } from "./pages/Admin/Classes";
import { AdminDashboard } from "./pages/Admin/Dashboard";

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
        element: <FacultyAttendance />,
        children: [
          {
            path: "/faculty/attendance",
            element: <Navigate to="/faculty/attendance/view" replace />,
          },
          {
            path: "/faculty/attendance/view",
            element: <FacultyAttendanceCalender />,
          },
          {
            path: "/faculty/attendance/post",
            element: <AttendanceForm />,
          },
        ],
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
        path: "/admin/",
        element: <Navigate to="/admin/dashboard/" replace />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/courses",
        element: <Courses />,
      },
      {
        path: "/admin/students",
        element: <Students />,
      },
      {
        path: "/admin/faculties",
        element: <Faculties />,
      },
      {
        path: "/admin/classes",
        element: <Classes />,
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
        path: "/student/",
        element: <Navigate to="/student/dashboard/" replace />,
      },
      {
        path: "/student/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "/student/attendance",
        element: <StudentAttendance />,
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
