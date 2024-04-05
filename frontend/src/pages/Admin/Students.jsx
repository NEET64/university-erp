import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { StudentForm } from "@/components/StudentForm";
import { StudentColumns } from "./studentColumns";
import { useEffect, useState } from "react";
import axios from "axios";

export const Students = () => {
  const [students, setStudents] = useState([]);

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
  }, []);

  return (
    <div>
      <Header title="Students" />
      <DataTable columns={StudentColumns} data={students}>
        <StudentForm />
      </DataTable>
    </div>
  );
};
