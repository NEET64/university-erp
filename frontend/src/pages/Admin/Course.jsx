import { Header } from "@/components/Header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CourseForm } from "@/components/CourseForm";
import { useEffect, useState } from "react";
import axios from "axios";

const dummyCourses = [
  { _id: "65c1e11b1ed480f26352c405", code: "CE02", name: "Python", credit: 3 },
  { _id: "65c1e11b1ed480f26352c406", code: "CE03", name: "C++", credit: 4 },
  {
    _id: "65c1e11b1ed480f26352c407",
    code: "CE04",
    name: "JavaScript",
    credit: 5,
  },
  { _id: "65c1e11b1ed480f26352c408", code: "CE05", name: "HTML", credit: 2 },
  { _id: "65c1e11b1ed480f26352c409", code: "CE06", name: "CSS", credit: 1 },
  { _id: "65c1e11b1ed480f26352c410", code: "CE07", name: "React", credit: 3 },
  { _id: "65c1e11b1ed480f26352c411", code: "CE08", name: "Node.js", credit: 4 },
  {
    _id: "65c1e11b1ed480f26352c412",
    code: "CE09",
    name: "Express.js",
    credit: 2,
  },
  { _id: "65c1e11b1ed480f26352c413", code: "CE10", name: "MongoDB", credit: 5 },
  { _id: "65c1e11b1ed480f26352c414", code: "CE11", name: "SQL", credit: 3 },
  { _id: "65c1e11b1ed480f26352c415", code: "CE12", name: "Git", credit: 4 },
  { _id: "65c1e11b1ed480f26352c416", code: "CE13", name: "Docker", credit: 1 },
  {
    _id: "65c1e11b1ed480f26352c417",
    code: "CE14",
    name: "Kubernetes",
    credit: 2,
  },
  { _id: "65c1e11b1ed480f26352c418", code: "CE15", name: "AWS", credit: 5 },
  { _id: "65c1e11b1ed480f26352c419", code: "CE16", name: "Azure", credit: 3 },
  {
    _id: "65c1e11b1ed480f26352c420",
    code: "CE17",
    name: "Google Cloud",
    credit: 4,
  },
  {
    _id: "65c1e11b1ed480f26352c421",
    code: "CE18",
    name: "Machine Learning",
    credit: 2,
  },
  {
    _id: "65c1e11b1ed480f26352c422",
    code: "CE19",
    name: "Data Science",
    credit: 5,
  },
  {
    _id: "65c1e11b1ed480f26352c423",
    code: "CE20",
    name: "Blockchain",
    credit: 1,
  },
  {
    _id: "65c1e11b1ed480f26352c424",
    code: "CE21",
    name: "Cybersecurity",
    credit: 3,
  },
  {
    _id: "65c1e11b1ed480f26352c425",
    code: "CE22",
    name: "Networking",
    credit: 4,
  },
  {
    _id: "65c1e11b1ed480f26352c426",
    code: "CE23",
    name: "Software Engineering",
    credit: 5,
  },
  {
    _id: "65c1e11b1ed480f26352c427",
    code: "CE24",
    name: "Artificial Intelligence",
    credit: 2,
  },
  {
    _id: "65c1e11b1ed480f26352c428",
    code: "CE25",
    name: "Robotics",
    credit: 4,
  },
  {
    _id: "65c1e11b1ed480f26352c429",
    code: "CE26",
    name: "UI/UX Design",
    credit: 1,
  },
  {
    _id: "65c1e11b1ed480f26352c430",
    code: "CE27",
    name: "Frontend Development",
    credit: 3,
  },
  {
    _id: "65c1e11b1ed480f26352c431",
    code: "CE28",
    name: "Backend Development",
    credit: 5,
  },
  {
    _id: "65c1e11b1ed480f26352c432",
    code: "CE29",
    name: "Full Stack Development",
    credit: 4,
  },
  { _id: "65c1e11b1ed480f26352c433", code: "CE30", name: "DevOps", credit: 2 },
];

export const Course = () => {
  const [courses, setCourses] = useState(dummyCourses);

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
  }, []);
  return (
    <div>
      <Header title="Course" />
      <CourseForm />
      <DataTable columns={columns} data={courses} />
    </div>
  );
};
