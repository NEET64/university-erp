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
import { toast } from "@/components/ui/use-toast";

export const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [course, setCourse] = useState([]);
  const [students, setStudents] = useState([]);
  const facultyId = localStorage.getItem("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    // get all assignments of curr facultyId
    axios
      .get("http://localhost:8000/assignment/faculty/" + facultyId)
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  }, []);

  useEffect(() => {
    // get courses for curr faculty
    axios.get("http://localhost:8000/faculty/" + facultyId).then((response) => {
      setCourse(response.data);
    });
  }, []);

  return (
    <div>
      <Header title="Assignment" />
      <DataTable
        columns={AssignmentColumns}
        data={assignments}
        searchBy="title">
        <AssignmentForm />
      </DataTable>
    </div>
  );
};
