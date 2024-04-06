import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassColumns } from "./classColumns";
import { CourseColumns } from "./courseColumns";
import { StudentColumns } from "./studentColumns";
import { FacultyColumns } from "./facultyColumns";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { PlanTable } from "@/components/PlanTable";

export function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/student")
      .then((response) => {
        setStudents(response.data.students);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/course")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/class")
      .then((response) => {
        setClasses(response.data.classes);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
    axios
      .get("http://localhost:8000/faculty")
      .then((response) => {
        setFaculties(response.data.faculties);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  useEffect(() => {
    setCourses((prevCourses) => {
      const updatedCourses = prevCourses.map((course) => ({ ...course }));
      faculties.forEach((faculty) => {
        faculty.courses.forEach((course) => {
          const courseIndex = updatedCourses.findIndex(
            (c) => c._id === course._id
          );
          if (courseIndex !== -1) {
            updatedCourses[courseIndex].faculties =
              updatedCourses[courseIndex].faculties || [];
            updatedCourses[courseIndex].faculties.push({
              _id: faculty._id,
              name: faculty.name,
            });
          }
        });
      });
      return updatedCourses;
    });
  }, [faculties]);

  return (
    <>
      <Header title={"Dashboard"} />
      <Tabs defaultValue="classes" className="my-2">
        <TabsList className="grid h-12 gap-1 w-full grid-cols-4 bg-white">
          <TabsTrigger
            value="classes"
            className="h-10 rounded data-[state=active]:bg-gradient-to-tr data-[state=active]:from-violet-200 data-[state=active]:to-violet-100 data-[state=active]:text-violet-800 hover:bg-violet-50">
            Classes
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="h-10 rounded data-[state=active]:bg-gradient-to-tr data-[state=active]:from-violet-200 data-[state=active]:to-violet-100 data-[state=active]:text-violet-800 hover:bg-violet-50">
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="faculties"
            className="h-10 rounded data-[state=active]:bg-gradient-to-tr data-[state=active]:from-violet-200 data-[state=active]:to-violet-100 data-[state=active]:text-violet-800 hover:bg-violet-50">
            Faculties
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="h-10 rounded data-[state=active]:bg-gradient-to-tr data-[state=active]:from-violet-200 data-[state=active]:to-violet-100 data-[state=active]:text-violet-800 hover:bg-violet-50">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="classes">
          {/* <ClassForm /> */}
          <PlanTable data={classes} columns={ClassColumns} />
        </TabsContent>
        <TabsContent value="courses">
          {/* <CourseForm /> */}
          <PlanTable data={courses} columns={CourseColumns} />
        </TabsContent>
        <TabsContent value="students">
          {/* <StudentForm /> */}
          <PlanTable data={students} columns={StudentColumns} />
        </TabsContent>
        <TabsContent value="faculties">
          {/* <FacultyForm /> */}
          <PlanTable data={faculties} columns={FacultyColumns} />
        </TabsContent>
      </Tabs>
    </>
  );
}
