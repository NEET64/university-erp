import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/Header";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [course, setCourse] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState("65e9f70d642440f8ab0026f5");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:8000/assignment/").then((response) => {
      setAssignments(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/faculty/" + "65e9f70d642440f8ab0026f5")
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
      });
  }, []);

  return (
    <div>
      <Header title="Assignment" />
      <div className="flex flex-row gap-5">
        <div className="w-48 my-4" id="select-course">
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>

            <SelectContent position="popper">
              {course.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* write a select code here to filter assignments */}
        </div>
        <div className="w-48 my-4" id="select-course">
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectItem value="course1">class1</SelectItem>
              <SelectItem value="course2">class2</SelectItem>
              <SelectItem value="course3">class3</SelectItem>
              <SelectItem value="course4">class4</SelectItem>
              <SelectItem value="course5">class5</SelectItem>
            </SelectContent>
          </Select>

          {/* write a select code here to filter assignments */}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {assignments.map((assignment, index) => (
          <div key={index}>
            <Card>
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>{assignment.aim}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* give assignment details */}
                {/* provide assignment upload option */}
                {/* give count if one has submitted or not */}
              </CardContent>
              <CardFooter>{/* do something here */}</CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
