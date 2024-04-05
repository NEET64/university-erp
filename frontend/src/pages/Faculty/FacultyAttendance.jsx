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
      });
  }, []);

  return (
    <>
      <Button asChild variant="outline" className="flex p-2 w-48">
        <Link to="/faculty/attendance/post">
          Post Attendance
          <Plus className="block p-1 rounded-md ml-2 -mb-0.5 bg-slate-200" />
        </Link>
      </Button>
      <Calendar events={facultyAttendance} belongsTo={"faculty"} />
    </>
  );
};
