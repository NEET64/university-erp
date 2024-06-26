// StudentAssignment.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CalendarIcon } from "lucide-react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StudentAssignment = () => {
  const studentId = localStorage.getItem("id");

  const [student, setStundent] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/student/` + studentId)
      .then((response) => {
        setStundent(response.data.student);
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
      <Header title="Courses" />

      <div className="grid grid-cols-1 gap-3 mx-1 mt-4">
        {student &&
          student.class.courseTeaching.map((course, index) => {
            return (
              <Card className="" key={index}>
                <CardHeader>
                  <CardTitle className="">{course.courseId.name}</CardTitle>
                  <CardDescription>
                    view all your assignment of {course.courseId.name} course
                    and make you perform good and get better marks
                  </CardDescription>
                  <hr />
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-0">
                  <div className="flex flex-col">
                    <p className="text-slate-800 font-bold ">Faculty</p>
                    <p className="text-slate-500">{course.facultyId.name}</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-slate-800 font-bold ">Course Code</p>
                    <p className="text-slate-500">{course.courseId.code}</p>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-slate-800 font-bold ">Course Credit</p>
                    <p className="text-slate-500">{course.courseId.credit}</p>
                  </div>

                  <Button variant="outline" className="p-0">
                    <Link
                      to={`/student/assignment/test?courseId=${course.courseId._id}&courseName=${course.courseId.name}&facultyName=${course.facultyId.name}`}
                      className="hover:bg-indigo-50 w-full h-full p-2">
                      view Assignment
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default StudentAssignment;
