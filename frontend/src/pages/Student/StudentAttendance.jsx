import { Calendar } from "@/components/Calendar";
import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const studentId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get("http://localhost:8000/attendance/" + studentId)
      .then((response) => {
        setAttendance(response.data.attendance);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Header title="Student Attendance" />
      <div className="rounded-lg flex-1">
        {console.log(attendance)}
        <Calendar events={attendance} belongsTo="student" />
      </div>
    </div>
  );
};
