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
import { AttendanceForm } from "./components/AttendanceForm";
import { Assignment } from "./pages/Faculty/Assignment";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { Courses } from "./pages/Admin/Courses";
import { Students } from "./pages/Admin/Students";
import { Faculties } from "./pages/Admin/Faculties";
import { Classes } from "./pages/Admin/Classes";
import { StudentAttendance } from "./pages/Student/StudentAttendance";
import StudentAssignment from "./pages/Student/StudentAssignment";
import AssignmentCourse from "./pages/Student/AssignmentCourse";
import NotFoundPage from "./pages/NotFound";
import { Login } from "./pages/Login";
import { FacultyDashboard } from "./pages/Faculty/Dashboard";
import { Fees } from "./pages/Student/Fees";
import { StudentSettings } from "./pages/Settings";
import { HelpPage } from "./pages/Help";
// import { Courses } from "./pages/Admin/Courses";
// import { StudentAttendance } from "./pages/Student/StudentAttendance";
// import { Assignment } from "./pages/Faculty/Assignment";
// import StudentAssignment from "./pages/Student/StudentAssignment";
// import { AttendanceForm } from "./components/AttendanceForm";
// import AssignmentCourse from "./pages/Student/AssignmentCourse";

const router = createBrowserRouter([
  {
    path: "/faculty",
    element: <Faculty />,
    children: [
      {
        path: "/faculty/",
        element: <Navigate to="/faculty/dashboard" replace />,
      },
      {
        path: "/faculty/dashboard",
        element: <FacultyDashboard />,
      },
      {
        path: "/faculty/attendance/",
        element: <AttendanceForm />,
      },
      {
        path: "/faculty/assignment",
        element: <Assignment />,
      },
      {
        path: "/faculty/settings",
        element: <StudentSettings />,
      },
      {
        path: "/faculty/help",
        element: <HelpPage />,
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
        path: "/admin/settings",
        element: <StudentSettings />,
      },
      {
        path: "/admin/help",
        element: <HelpPage />,
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
        path: "/student/assignment/test",
        element: <AssignmentCourse />,
      },
      {
        path: "/student/fees",
        element: <Fees />,
      },
      {
        path: "/student/Settings",
        element: <StudentSettings />,
      },
      {
        path: "/student/help",
        element: <HelpPage />,
      },
      {
        path: "/student/:anything",
        element: <Header title="Feature Coming Soon" />,
      },
    ],
  },
  {
    path: "/*",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
