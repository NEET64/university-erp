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

import { StudentAttendance } from "./pages/Student/StudentAttendance";
import { Assignment } from "./pages/Faculty/Assignment";
import { StudentAssignment } from "./pages/Student/StudentAssignment";
import { AttendanceForm } from "./components/AttendanceForm";
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
        element: <Assignment />,
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
        element: <Course title="Course" />,
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
        element: <StudentAssignment />,
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
