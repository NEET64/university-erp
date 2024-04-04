import { Calendar } from "@/components/Calendar";
import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/attendance/65c657dbaf0982c4aebeedc1")
      .then((response) => {
        setAttendance(response.data.attendance);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Header title="Student Attendance" />
      <div className="rounded-lg flex-1">
        <Calendar events={attendance} belongsTo="student" />
      </div>
    </div>
  );
};
