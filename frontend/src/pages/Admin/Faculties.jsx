import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { FacultyColumns } from "./facultyColumns";
import { FacultyForm } from "@/components/FacultyForm";

export const Faculties = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <Header title="Faculties" />
      <DataTable columns={FacultyColumns} data={faculties}>
        <FacultyForm />
      </DataTable>
    </div>
  );
};
