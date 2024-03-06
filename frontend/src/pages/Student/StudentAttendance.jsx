import { Calendar } from "@/components/Calendar";
import axios from "axios";
import { addDays, subDays } from "date-fns";
import { useEffect, useState } from "react";

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/attendance").then((response) => {
      setAttendance(response.data.attendance);
    });
  }, []);

  return (
    <div className="border border-white rounded-lg p-5">
      <p className="text-xl">This is the student attendance</p>
      <div className=" rounded-lg">
        <Calendar events={attendance} />
      </div>
    </div>
  );
};
