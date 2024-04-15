import { Header } from "@/components/Header";
import { Chart } from "./Chart";
import { AttendanceMeta } from "@/components/AttendanceMeta";
import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/Calendar";
import { AssignmentMeta } from "@/components/AssignmentMeta";
import { NotificationList } from "@/components/Notification";

export const StudentDashboard = () => {
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
    <>
      <Header title="Dashboard" />

      {/* <div className="mt-2 grow grid grid-cols-4 grid-rows-12 gap-2 sm:grid-cols-8 md:grid-cols-11 md:grid-rows-8">
        <div className="bg-white rounded-md col-span-2">1</div>
        <div className="bg-white rounded-md col-span-2 col-start-3 sm:col-start-3">
          2
        </div>
        <div className="bg-white rounded-md col-span-2 row-start-2 sm:col-start-5 sm:row-start-1">
          3
        </div>
        <div className="bg-white rounded-md col-span-2 col-start-3 row-start-2 sm:col-start-7 sm:row-start-1">
          4
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-3 sm:col-span-5 sm:row-span-4 sm:row-start-2 md:col-start-1">
          <Chart />
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-5 sm:col-span-3 sm:row-span-4 sm:col-start-6 sm:row-start-2 md:col-start-6">
          <AttendanceMeta />
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-7 sm:col-span-8 sm:row-start-6 md:row-span-3 md:col-start-1">
          <AssignmentMeta />
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-9 sm:row-span-5 sm:row-start-8 md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-1">
          <Calendar events={attendance} belongsTo="student" isSmall={true} />
        </div>
        <div
          className="bg-white rounded-md col-span-4 row-span-2 row-start-11 sm:row-span-5 sm:col-start-5 sm:row-start-8
        md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-5">
          <NotificationList />
        </div>
      </div> */}

      {/* <div className="flex flex-wrap gap-2 sm:flex-nowrap md:flex-nowrap md:flex-wrap">
        <div className="bg-white rounded-md w-full sm:w-1/4 md:w-2/12">1</div>
        <div className="bg-white rounded-md w-full sm:w-1/4 md:w-2/12 sm:ml-auto">
          2
        </div>
        <div className="bg-white rounded-md w-full sm:w-1/4 md:w-2/12 sm:mt-2 md:mt-0">
          3
        </div>
        <div className="bg-white rounded-md w-full sm:w-1/4 md:w-2/12 sm:ml-auto sm:mt-2 md:mt-0">
          4
        </div>
        <div className="bg-white rounded-md w-full sm:w-5/6 md:w-full md:col-span-4 md:row-span-2">
          <Chart />
        </div>
        <div className="bg-white rounded-md w-full sm:w-3/4 md:w-5/12 md:col-start-6 md:row-start-2">
          <AttendanceMeta />
        </div>
        <div className="bg-white rounded-md w-full sm:w-full md:w-3/12 md:col-start-1 md:row-start-4">
          <AssignmentMeta />
        </div>
        <div className="bg-white rounded-md w-full sm:w-3/4 md:w-5/12 md:col-start-1 md:row-start-6">
          <Calendar events={attendance} belongsTo="student" isSmall={true} />
        </div>
        <div className="bg-white rounded-md w-full sm:w-3/4 md:w-3/12 md:col-start-7 md:row-start-6">
          <NotificationList />
        </div>
      </div> */}

      <div className="mt-2 w-full flex gap-2 flex-1 justify-center">
        <div className="grow">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <div className="grow bg-white rounded-md">
                <Chart />
              </div>
              <div className="grow bg-white rounded-md w-[30%]">
                <AttendanceMeta />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-md">
                <AssignmentMeta searchBy="title" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[250px]">
          <div className="bg-white rounded-md ">
            <Calendar events={attendance} belongsTo="student" isSmall={true} />
          </div>
          <div className="bg-white rounded-md grow">
            <NotificationList />
          </div>
        </div>
      </div>
    </>
  );
};
