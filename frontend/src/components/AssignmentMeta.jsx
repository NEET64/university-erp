import { Header } from "@/components/Header";
import { PlanTable } from "@/components/PlanTable";
import { CourseAssignmentColumns } from "./assignmentcolumn";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function AssignmentMeta() {
  const data = [
    {
      title: "DBMS Assignment",
      faculty: "Dr. Patel",
      course: "Database Management Systems",
      dueDate: "2024-04-10T00:00:00.000Z",
    },
    {
      title: "Statistics and Probability Project",
      faculty: "Prof. Garcia",
      course: "Statistics and Probability",
      dueDate: "2024-04-10T00:00:00.000Z",
    },
    {
      title: "JavaScript Coding Challenge",
      faculty: "Dr. Carter",
      course: "Web Development",
      dueDate: "2024-04-10T00:00:00.000Z",
    },
    {
      title: "Data Analysis Report",
      faculty: "Dr. Johnson",
      course: "Data Science",
      dueDate: "2024-04-15T00:00:00.000Z",
    },

    {
      title: "JavaScript Coding Challenge",
      faculty: "Dr. Carter",
      course: "Web Development",
      dueDate: "2024-04-10T00:00:00.000Z",
    },
  ];

  return (
    <>
      <div className="text-lg border-b font-semibold flex justify-between items-center m-2 p-2 pb-2 max-h-fit">
        <span>Assignments</span>
        <Button asChild variant="outline">
          <Link
            className=" h-6 w-14 text-xs text-slate-400"
            to="/student/assignment">
            View All
          </Link>
        </Button>
      </div>
      <PlanTable data={data} columns={CourseAssignmentColumns} />
    </>
  );
}
