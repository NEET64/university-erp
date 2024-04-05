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

  //get student id from localstorage
  const studentId = "65c657dbaf0982c4aebeedc1";
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
        console.log(error);
      });
  }, []);

  // if (assignments.length > 0) {
  //   console.log(assignments[0].course.name);
  // }

  return (
    <>
      <Header />
      <Card className="mx-80">
        {
          <CardContent className="grid grid-cols-1 mt-4  gap-4 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-center">
              <p className="text-slate-800 font-bold ">Course</p>
              <p className="text-slate-500">{courseName}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-slate-800 font-bold ">Faculty</p>
              <p className="text-slate-500">{facultyName}</p>
            </div>
          </CardContent>
        }
      </Card>
      <DataTable
        columns={CourseAssignmentColumns}
        data={assignments}
        searchBy={"course"}></DataTable>
    </>
  );
};

export default AssignmentCourse;
