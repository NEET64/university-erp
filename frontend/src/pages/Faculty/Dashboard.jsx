import { Header } from "@/components/Header";
import { FacultyAttendanceCalender } from "./FacultyAttendance";

export const FacultyDashboard = () => {
  return (
    <>
      <Header title="Faculty" />
      <FacultyAttendanceCalender />
    </>
  );
};
