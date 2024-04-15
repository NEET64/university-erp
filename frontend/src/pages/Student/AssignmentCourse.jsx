import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Assignment } from "../Faculty/Assignment";
import { CourseAssignmentColumns } from "./CourseAssignmentColumns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable";

const AssignmentCourse = () => {
  const location = useLocation();

  const studentId = localStorage.getItem("id");
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");
  const courseName = urlParams.get("courseName");
  const facultyName = urlParams.get("facultyName");

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/assignment/courseAssignments/", {
        studentId: studentId,
        courseId: courseId,
      })
      .then(function (response) {
        setAssignments(response.data);
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  // if (assignments.length > 0) {
  //   console.log(assignments[0].course.name);
  // }

  return (
    <>
      <Header />
      <DataTable
        columns={CourseAssignmentColumns}
        data={assignments}
        searchBy={"course"}>
        <div className="flex gap-2">
          <span className="bg-white w-54 flex gap-2 justify-center items-center px-5 rounded-md">
            <p className="text-slate-600">Course: </p>
            <p className="text-slate-600 font-semibold">{courseName}</p>
          </span>
          <span className="bg-white w-54 flex gap-2 justify-center items-center px-5 rounded-md">
            <p className="text-slate-600">Faculty: </p>
            <p className="text-slate-600 font-semibold">{facultyName}</p>
          </span>
        </div>
      </DataTable>
    </>
  );
};

export default AssignmentCourse;
