import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Assignment } from "../Faculty/Assignment";
import { CourseAssignmentDataTable } from "./courseAssignmentDataTable";
import { CourseAssignmentColumns } from "./courseAssignmentColumns";
import { Separator } from "@/components/ui/separator";

const AssignmentCourse = () => {
  const location = useLocation();

  //get student id from localstorage
  const studentId = "65e9fb37642440f8ab0026fc";
  const courseId = location.search.substring(1);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/assignment/courseAssignments/", {
        studentId: studentId,
        courseId: courseId,
      })
      .then(function (response) {
        setAssignments(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (assignments.length > 0) {
    console.log(assignments[0].course.name);
  }

  return (
    <>
      <Header />
      <Card className="mx-80">
        {assignments[0] && (
          <CardContent className="grid grid-cols-1 mt-4  gap-4 md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-center">
              <p className="text-slate-800 font-bold ">Course</p>
              <p className="text-slate-500">{assignments[0].course.name}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-slate-800 font-bold ">Faculty</p>
              <p className="text-slate-500">{assignments[0].faculty.name}</p>
            </div>
          </CardContent>
        )}
      </Card>
      <CourseAssignmentDataTable
        columns={CourseAssignmentColumns}
        data={assignments}
      />
    </>
  );
};

export default AssignmentCourse;
