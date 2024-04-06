import { Header } from "@/components/Header";
import { Link, Outlet } from "react-router-dom";
import { Calendar } from "@/components/Calendar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  return (
    <>
      <Calendar events={facultyAttendance} belongsTo={"faculty"} />
    </>
  );
};
