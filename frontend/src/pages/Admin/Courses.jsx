import { Header } from "@/components/Header";
import { DataTable } from "../../components/DataTable";
import { CourseColumns } from "./courseColumns";
import { CourseForm } from "@/components/CourseForm";
import { useEffect, useState } from "react";
import axios from "axios";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
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
    <div>
      <Header title="Course" />
      <DataTable columns={CourseColumns} data={courses}>
        <CourseForm />
      </DataTable>
    </div>
  );
};
