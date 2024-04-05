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
// import { AssignmentDataTable } from "./AssignmentDataTable";
import { AssignmentColumns } from "./assignmentColumns";
import { AssignmentForm } from "@/components/AssignmentForm";
import { DataTable } from "@/components/DataTable";

export const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [course, setCourse] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState("65c5e6db85c4191c88d6e2ce");
  const [data, setData] = useState([]);

  useEffect(() => {
    // get all assignments of curr faculty
    axios
      .get("http://localhost:8000/assignment/faculty/" + faculty)
      .then((response) => {
        setAssignments(response.data);
      });
  }, []);

  useEffect(() => {
    // get courses for curr faculty
    axios.get("http://localhost:8000/faculty/" + faculty).then((response) => {
      setCourse(response.data);
    });
  }, []);

  return (
    <div>
      <Header title="Assignment" />
      <DataTable columns={AssignmentColumns} data={assignments}>
        <AssignmentForm />
      </DataTable>
    </div>
  );
};
