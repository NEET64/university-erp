import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { FacultyForm } from "@/components/FacultyForm";
import { ClassForm } from "@/components/ClassForm";
import { toast } from "@/components/ui/use-toast";
import { ClassColumns } from "./classColumns";

export const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Header title="Classes" />
      <DataTable data={classes} columns={ClassColumns}>
        <ClassForm />
      </DataTable>
    </div>
  );
};
