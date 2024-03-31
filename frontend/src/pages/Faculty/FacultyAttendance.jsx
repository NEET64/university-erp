import { Header } from "@/components/Header";
import { Link, Outlet } from "react-router-dom";
import { Calendar } from "@/components/Calendar";
import axios from "axios";
import { useEffect, useState } from "react";

export const FacultyAttendance = () => {
  return (
    <>
      <Header title="Attendance" />
      <Outlet />
    </>
  );
};

export const FacultyAttendanceCalender = () => {
  const [facultyAttendance, setFacultyAttendance] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/attendance/faculty/65c5e6db85c4191c88d6e2ce")
      .then((response) => {
        setFacultyAttendance(response.data.attendance);
      });
  }, []);

  return (
    <>
      <Link to="/faculty/attendance/post">Post Attendance</Link>
      <Calendar events={facultyAttendance} belongsTo={"faculty"} />
    </>
  );
};
